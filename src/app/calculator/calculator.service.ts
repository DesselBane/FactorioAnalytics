import {Injectable} from '@angular/core';
import {CalculatorSession} from "../model/calculator-session";
import {StorageService} from "../storage/storage.service";
import {FactorioRecipe} from "../model/factorio-recipe";
import {FactorioCraftingMachine} from "../model/factorio-crafting-machine";

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  private readonly _sessionsKey = "calculator-service-sessions";
  private readonly _currentSessions: CalculatorSession[] = [];
  private _storageService: StorageService;

  constructor(storageService: StorageService) {
    this._storageService = storageService;
    this._currentSessions = JSON.parse(localStorage.getItem(this._sessionsKey));

    if (this._currentSessions == null)
      this._currentSessions = [];
  }

  public updateForTargetAmount(currentSession: CalculatorSession) {
    this.updateForTargetAmountImpl(currentSession);
    this.storeSessions();
  }

  public createSession(recipeName: string): string {
    let newSession = this.createSessionImpl(recipeName);
    this._currentSessions.push(newSession);
    this.storeSessions();

    return newSession.SessionId;
  }

  private updateForTargetAmountImpl(currentSession: CalculatorSession) {
    currentSession.CraftingsPerSecond = 1 / (currentSession.Recipe.energy / currentSession.CraftingSpeedMultiplier);
    currentSession.ItemsPerSecond = currentSession.CraftingsPerSecond * currentSession.Recipe.product.amount * currentSession.CraftingOutputMultiplier;
    currentSession.TargetCraftingsPerSecond = currentSession.TargetAmountPerSecond / currentSession.Recipe.product.amount;
    currentSession.NeededAssemblersCount = currentSession.TargetCraftingsPerSecond / currentSession.CraftingsPerSecond;

    for (let subSession of currentSession.SubSessions) {
      let amount = currentSession.Recipe.ingredients.find(x => x.name === subSession.Recipe.name).amount;
      subSession.TargetAmountPerSecond = currentSession.TargetCraftingsPerSecond * amount;
      this.updateForTargetAmountImpl(subSession);
    }
  }

  private createSessionImpl(recipeName: string, sessionId?: string): CalculatorSession {
    let recipe = this._storageService.getRecipeByName(recipeName);

    if (recipe == null)
      return null;

    let newSession = new CalculatorSession(recipe, sessionId);

    for (let ingriedient of newSession.Recipe.ingredients) {
      let subSession = this.createSessionImpl(ingriedient.name, newSession.SessionId);

      if (subSession != null)
        newSession.SubSessions.push(subSession);
    }

    return newSession;
  }

  public getSession(sessionId: string): CalculatorSession {
    return this._currentSessions.find(x => x.SessionId === sessionId);
  }

  public getAllSessions(): CalculatorSession[] {
    return this._currentSessions;
  }

  public removeSession(sessionId: string) {
    let session = this._currentSessions.find(x => x.SessionId === sessionId);
    this._currentSessions.splice(this._currentSessions.indexOf(session), 1);
    this.storeSessions();
  }

  private storeSessions() {
    localStorage.setItem(this._sessionsKey, JSON.stringify(this._currentSessions));
  }

  public static recipeCanBeCraftedInMachine(recipe: FactorioRecipe, craftingMachine: FactorioCraftingMachine): boolean {
    return craftingMachine.craftingCategories.includes(recipe.category) && craftingMachine.ingredientCount >= recipe.ingredients.length;
  }

  public updateCraftingMachine(currentSession: CalculatorSession, craftingMachine: FactorioCraftingMachine) {
    if (!CalculatorService.recipeCanBeCraftedInMachine(currentSession.Recipe, craftingMachine))
      throw "Recipe cant be crafted in this machine";

    currentSession.CraftingMachine = craftingMachine;
    currentSession.CraftingSpeedMultiplier = craftingMachine.craftingSpeed;

    this.storeSessions();
  }

}

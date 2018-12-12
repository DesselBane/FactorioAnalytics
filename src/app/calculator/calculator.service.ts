import {Injectable} from '@angular/core';
import {CalculatorSession} from "../model/calculator-session";
import {StorageService} from "../storage/storage.service";

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

  public static update(CurrentSession: CalculatorSession) {
    CurrentSession.CraftingsPerSecond = 1 / (CurrentSession.Recipe.energy / CurrentSession.CraftingSpeedMultiplier);
    CurrentSession.ItemsPerSecond = CurrentSession.CraftingsPerSecond * CurrentSession.Recipe.product.amount * CurrentSession.CraftingOutputMultiplier;
    CurrentSession.TargetCraftingsPerSecond = CurrentSession.TargetAmountPerSecond / CurrentSession.Recipe.product.amount;
    CurrentSession.NeededAssemblersCount = CurrentSession.TargetCraftingsPerSecond / CurrentSession.CraftingsPerSecond;
  }

  public updateSubsessions(currentSession: CalculatorSession) {
    if (currentSession.SubSessions == null || currentSession.SubSessions.length === 0)
      this.createSubsessions(currentSession);

    for (let subSession of currentSession.SubSessions) {
      let amount = currentSession.Recipe.ingredients.find(x => x.name === subSession.Recipe.name).amount;
      subSession.TargetAmountPerSecond = currentSession.TargetCraftingsPerSecond * amount;
      CalculatorService.update(subSession);
    }
  }

  private createSubsessions(currentSession: CalculatorSession) {
    console.log("creating subsessions");

    for (let ingriedient of currentSession.Recipe.ingredients) {
      let recipe = this._storageService.getRecipeByName(ingriedient.name);
      let newSession = new CalculatorSession(recipe, currentSession.SessionId);
      currentSession.SubSessions.push(newSession);
    }
  }

  public createSession(recipeName: string): string {
    let recipe = this._storageService.getRecipeByName(recipeName);

    let newSession = new CalculatorSession(recipe);
    this._currentSessions.push(newSession);
    this.storeSessions();

    return newSession.SessionId;
  }

  public getSession(sessionId: string): CalculatorSession {
    console.log(sessionId);
    let session = this._currentSessions.find(x => x.SessionId === sessionId);

    console.log(session);
    console.log(this._currentSessions);

    return session;
  }

  private storeSessions() {
    localStorage.setItem(this._sessionsKey, JSON.stringify(this._currentSessions));
  }
}

import {Injectable} from '@angular/core';
import {CalculatorSession} from '../model/calculator-session';
import {StorageService} from '../storage/storage.service';
import {FactorioRecipe} from '../model/factorio-recipe';
import {FactorioCraftingMachine} from '../model/factorio-crafting-machine';
import {FactorioModule} from '../model/factorio-module';
import {Settings} from '../model/settings';
import {SettingsService} from '../settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  private readonly _sessionsKey = "calculator-service-sessions";
  private readonly _currentSessions: CalculatorSession[] = [];
  private _storageService: StorageService;
  private _settingsService: SettingsService;

  constructor(storageService: StorageService,
              settingsService: SettingsService) {
    this._storageService = storageService;
    this._settingsService = settingsService;
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

    let defaultProfile = this._settingsService.loadProfile();

    if (defaultProfile != null) {
      this.setProfileForSession(newSession, defaultProfile);
    }

    this.storeSessions();

    return newSession.SessionId;
  }

  private static updateMulitplier(currentSession: CalculatorSession) {
    let speedMultiplier = 1;
    let outputMultiplier = 1;

    for (let module of currentSession.Modules)
      for (let effect of module.moduleEffects) {
        switch (effect[0]) {
          case "speed":
            speedMultiplier += effect[1];
            break;
          case "productivity":
            outputMultiplier += effect[1];
            break;
        }
      }


    for (let module of currentSession.Beacons)
      for (let effect of module.moduleEffects) {
        switch (effect[0]) {
          case "speed":
            speedMultiplier += effect[1] / 2;
            break;
          case "productivity":
            outputMultiplier += effect[1] / 2;
            break;
        }
      }

    currentSession.CraftingSpeedMultiplier = speedMultiplier * currentSession.CraftingMachine.craftingSpeed;
    currentSession.CraftingOutputMultiplier = outputMultiplier;
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

  public storeSessions() {
    localStorage.setItem(this._sessionsKey, JSON.stringify(this._currentSessions));
  }

  public static recipeCanBeCraftedInMachine(recipe: FactorioRecipe, craftingMachine: FactorioCraftingMachine): boolean {
    return craftingMachine.craftingCategories.includes(recipe.category) && craftingMachine.ingredientCount >= recipe.ingredients.length;
  }

  public updateCraftingMachine(currentSession: CalculatorSession, craftingMachine: FactorioCraftingMachine) {
    if (!CalculatorService.recipeCanBeCraftedInMachine(currentSession.Recipe, craftingMachine))
      throw "Recipe cant be crafted in this machine";

    currentSession.CraftingMachine = craftingMachine;

    let moduleSizeDiff = currentSession.Modules.length - currentSession.CraftingMachine.moduleInventorySize;

    if (moduleSizeDiff > 0)
      currentSession.Modules.splice(currentSession.Modules.length - moduleSizeDiff, moduleSizeDiff);

    CalculatorService.updateMulitplier(currentSession);
    this.updateForTargetAmount(currentSession);
    this.storeSessions();
  }

  public addModuleToSession(currentSession: CalculatorSession, module: FactorioModule) {
    if (currentSession.CraftingMachine == null)
      throw "No crafting machine selected. Please select one before adding modules!";
    if (currentSession.Modules.length === currentSession.CraftingMachine.moduleInventorySize)
      throw "Maximum amount of modules already reached. Can't add any more!";

    currentSession.Modules.push(module);
    CalculatorService.updateMulitplier(currentSession);
    this.updateForTargetAmount(currentSession);
  }

  public removeModule(currentSession: CalculatorSession, module: FactorioModule) {
    let index = currentSession.Modules.findIndex(x => x.name === module.name);

    if (index === -1)
      throw "Module not found!";

    currentSession.Modules.splice(index, 1);
    CalculatorService.updateMulitplier(currentSession);
    this.updateForTargetAmount(currentSession);
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

  public addBeaconToSession(currentSession: CalculatorSession, module: FactorioModule) {
    currentSession.Beacons.push(module);
    CalculatorService.updateMulitplier(currentSession);
    this.updateForTargetAmount(currentSession);
  }

  removeBeacon(currentSession: CalculatorSession, module: FactorioModule) {
    let index = currentSession.Beacons.findIndex(x => x.name === module.name);

    if (index === -1)
      throw "Module not found!";

    currentSession.Beacons.splice(index, 1);
    CalculatorService.updateMulitplier(currentSession);
    this.updateForTargetAmount(currentSession);
  }

  public setProfileForSession(currentSession: CalculatorSession, settings: Settings) {
    let categorySettings = settings.craftingCategorySettings.find(x => x.category === currentSession.Recipe.category);

    if (categorySettings != null) {
      this.updateCraftingMachine(currentSession, categorySettings.craftingMachine);
      currentSession.CraftingMachine = categorySettings.craftingMachine;
      currentSession.Modules = [];
      currentSession.Beacons = [];

      Object.assign(categorySettings.modules, currentSession.Modules);
      Object.assign(categorySettings.beacons, currentSession.Beacons);
    }

    for (let subsession of currentSession.SubSessions) {
      this.setProfileForSession(subsession, settings);
    }
  }
}

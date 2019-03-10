import {FactorioRecipe} from './factorio-recipe';
import {UUID} from 'angular2-uuid';
import {FactorioCraftingMachine} from './factorio-crafting-machine';
import {FactorioModule} from './factorio-module';

export class CalculatorSession {

  public SessionId: string;
  public Name: string;

  public Recipe: FactorioRecipe;
  public CraftingMachine: FactorioCraftingMachine;
  public Modules: FactorioModule[] = [];
  public Beacons: FactorioModule[] = [];

  SubSessions: CalculatorSession[] = [];

  CraftingOutputMultiplier: number = 1;
  CraftingSpeedMultiplier: number = 1;

  TargetAmountPerSecond: number = 0;
  TargetCraftingsPerSecond: number;

  CraftingsPerSecond: number;
  ItemsPerSecond: number;
  NeededAssemblersCount: number;

  constructor(recipe: FactorioRecipe,
              sessionId?: string) {
    this.Recipe = recipe;
    this.SessionId = sessionId;

    if (this.SessionId == null)
      this.SessionId = UUID.UUID();
  }

}

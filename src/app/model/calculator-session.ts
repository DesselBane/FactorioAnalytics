import {FactorioRecipe} from "./factorio-recipe";
import {UUID} from "angular2-uuid";

export class CalculatorSession {

  public SessionId: string;

  public Recipe: FactorioRecipe;

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

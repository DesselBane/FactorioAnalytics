import {IFactorioRecipe} from "./i-factorio-recipe";
import {UUID} from "angular2-uuid";

export class CalculatorSession {

  public SessionId: string;

  public Recipe: IFactorioRecipe;

  SubSessions: CalculatorSession[] = [];

  CraftingOutputMultiplier: number = 1;
  CraftingSpeedMultiplier: number = 1;

  TargetAmountPerSecond: number;
  TargetCraftingsPerSecond: number;

  CraftingsPerSecond: number;
  ItemsPerSecond: number;

  constructor(recipe: IFactorioRecipe,
              sessionId?: string) {
    this.Recipe = recipe;
    this.SessionId = sessionId;

    if (this.SessionId == null)
      this.SessionId = UUID.UUID();
  }

}

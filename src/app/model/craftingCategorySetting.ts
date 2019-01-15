import {FactorioCraftingMachine} from "./factorio-crafting-machine";
import {FactorioModule} from "./factorio-module";

export class CraftingCategorySetting {
  category: string;
  craftingMachine: FactorioCraftingMachine;
  modules: FactorioModule[] = [];
  beacons: FactorioModule[] = [];

  constructor(name: string) {
    this.category = name;
  }
}

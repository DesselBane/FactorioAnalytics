import {Injectable} from '@angular/core';
import {FactorioRecipe} from "../model/factorio-recipe";
import {Subject} from "rxjs";
import {FactorioCraftingMachine} from "../model/factorio-crafting-machine";

@Injectable({
  providedIn: 'root'
})
export class StorageService {


  private static readonly recipeStorageKey = "factorio-recepie-store";
  private static readonly craftingMachinesStorageKey = "factorio-crafting-machines-store";
  private _recipeCache: FactorioRecipe[];

  constructor() {
    this._recipeCache = JSON.parse(localStorage.getItem(StorageService.recipeStorageKey));
  }

  private _recipesChanged: Subject<FactorioRecipe[]> = new Subject();

  private _craftingMachineCache: FactorioCraftingMachine[];


  get recipesChanged(): Subject<FactorioRecipe[]> {
    return this._recipesChanged;
  }

  get recipeCache(): FactorioRecipe[] {
    return this._recipeCache;
  }

  get craftingMachineCache(): FactorioCraftingMachine[] {
    return this._craftingMachineCache;
  }

  private _craftingMachinesChanged: Subject<FactorioCraftingMachine[]> = new Subject();

  get craftingMachinesChanged(): Subject<FactorioCraftingMachine[]> {
    return this._craftingMachinesChanged;
  }

  private static parseCraftingMachines(data: any): FactorioCraftingMachine[] {
    let result = [];

    for (let craftingMachine of Object.values(data)) {
      result.push(FactorioCraftingMachine.Parse(craftingMachine))
    }
    console.log(result);

    return result;
  }

  private static parseRecepies(json: any): FactorioRecipe[] {
    let result = [];

    for (let recepie of Object.values(json)) {
      let frecepie = FactorioRecipe.Parse(recepie);
      result.push(frecepie);
    }

    return result;
  }

  public importFiles(files: File[]) {
    for (let value of files) {
      if (value.name.endsWith(".json")) {
        this.importRecepies(value);
        continue;
      }
      if (value.name.endsWith(".png"))
        this.importIcon(value);
    }
  }

  private importIcon(file: File) {
    let fileReader = new FileReader();
    fileReader.onload = (data: any) => {
      localStorage.setItem(file.name, 'data:image/png;base64,' + btoa(data.target.result));
    };
    fileReader.readAsBinaryString(file);
  }

  private importRecepies(file: File) {
    let fileReader = new FileReader();
    fileReader.onload = (data: any) => {
      let json = JSON.parse(data.target.result);
      let recepies = StorageService.parseRecepies(json.recipe);
      let craftingMachines = StorageService.parseCraftingMachines(json.crafting_machine);
      this.storeRecepies(recepies);
      this.storeCraftingMachines(craftingMachines);
    };
    fileReader.readAsText(file);
  }

  public getRecipeByName(recipeName: string): FactorioRecipe {
    return this._recipeCache.find(x => x.name == recipeName);
  }

  private storeRecepies(data: FactorioRecipe[]) {
    this._recipeCache = data;
    localStorage.setItem(StorageService.recipeStorageKey, JSON.stringify(data));
    this._recipesChanged.next(data);
  }

  private storeCraftingMachines(data: FactorioCraftingMachine[]) {
    this._craftingMachineCache = data;
    localStorage.setItem(StorageService.craftingMachinesStorageKey, JSON.stringify(data));
    this._craftingMachinesChanged.next(data);
  }


}

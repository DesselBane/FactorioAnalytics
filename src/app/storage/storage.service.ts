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

  private static readonly questionmarkIcon = "data:image/png;base64,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";

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


  public static getIconByName(name: string): string {
    let icon = localStorage.getItem(name + '.png');

    if (icon == null)
      icon = StorageService.questionmarkIcon;

    return icon;
  }

}

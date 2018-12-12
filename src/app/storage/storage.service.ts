import {Injectable} from '@angular/core';
import {FactorioRecipe, IFactorioRecipe} from "../model/i-factorio-recipe";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private static readonly storageKey = "factorio-recepie-store";

  constructor() {
    this._recipeCache = JSON.parse(localStorage.getItem(StorageService.storageKey));
  }

  private _recipesChanged: Subject<IFactorioRecipe[]> = new Subject();

  get recipesChanged(): Subject<IFactorioRecipe[]> {
    return this._recipesChanged;
  }

  private _recipeCache: IFactorioRecipe[];

  get recipeCache(): IFactorioRecipe[] {
    return this._recipeCache;
  }

  importFiles(files: File[]) {
    for (let value of files) {
      if (value.name.endsWith(".json")) {
        this.importRecepies(value);
        continue;
      }
      if (value.name.endsWith(".png"))
        this.importIcon(value);
    }
  }

  private static parseRecepies(json: any): IFactorioRecipe[] {
    let result = [];

    for (let recepie of Object.values(json)) {
      let frecepie = FactorioRecipe.Parse(recepie);
      result.push(frecepie);
    }

    return result;
  }

  importIcon(file: File) {
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
      let recepies = StorageService.parseRecepies(json);
      this.storeRecepies(recepies);
    };
    fileReader.readAsText(file);
  }

  public getRecipeByName(recipeName: string): IFactorioRecipe {
    return this._recipeCache.find(x => x.name == recipeName);
  }

  private storeRecepies(data: IFactorioRecipe[]) {
    this._recipeCache = data;
    localStorage.setItem(StorageService.storageKey, JSON.stringify(data));
    this._recipesChanged.next(data);
  }


}

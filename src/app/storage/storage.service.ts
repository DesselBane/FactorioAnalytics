import {Injectable} from '@angular/core';
import {FactorioRecipe, IFactorioRecipe} from "../model/i-factorio-recipe";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private static readonly storageKey = "factorio-recepie-store";

  private _recepiesChanged: Subject<IFactorioRecipe[]> = new Subject();

  get recepiesChanged(): Subject<IFactorioRecipe[]> {
    return this._recepiesChanged;
  }



  constructor() {

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

  public static retrieveRecepies(): IFactorioRecipe[] {
    return JSON.parse(localStorage.getItem(StorageService.storageKey));
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
    //TODO
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

  private storeRecepies(data: IFactorioRecipe[]) {
    localStorage.setItem(StorageService.storageKey, JSON.stringify(data));
    this._recepiesChanged.next(data);
  }
}

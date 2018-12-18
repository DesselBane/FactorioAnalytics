import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../storage/storage.service";
import {FactorioRecipe} from "../../model/factorio-recipe";
import {Subject} from "rxjs";
import {debounceTime, map} from "rxjs/operators";

@Component({
  selector: 'app-recepie-browser',
  templateUrl: './recipe-browser.component.html',
  styleUrls: ['./recipe-browser.component.css']
})
export class RecipeBrowserComponent implements OnInit {
  private _storageService: StorageService;

  public recepies: FactorioRecipe[];
  private _recipesSubject = new Subject<string>();
  private _recipeData: FactorioRecipe[];

  constructor(storageService: StorageService) {
    this._storageService = storageService;

  }

  ngOnInit() {
    this._recipeData = this._storageService.recipeCache;
    this.recepies = this._recipeData;
    this._recipesSubject.asObservable()
      .pipe(
        debounceTime(500),
        map(value => this._recipeData.filter(recipe => {
          if (value == "")
            return true;
          else
            return recipe.name.includes(value);
        }))
      ).subscribe(filteredData => this.recepies = filteredData);

    this._storageService.recipesChanged.subscribe((data) => {
      this._recipeData = data;
    });

  }

  getImageForRecipe(recipeName: string): string {
    return StorageService.getIconByName(recipeName);
  }

  onSearchKeyUp(value: string) {
    this._recipesSubject.next(value);
  }
}

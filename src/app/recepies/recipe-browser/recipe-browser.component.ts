import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../storage/storage.service";
import {IFactorioRecipe} from "../../model/i-factorio-recipe";

@Component({
  selector: 'app-recepie-browser',
  templateUrl: './recipe-browser.component.html',
  styleUrls: ['./recipe-browser.component.css']
})
export class RecipeBrowserComponent implements OnInit {
  private _storageService: StorageService;

  public recepies: IFactorioRecipe[];

  constructor(storageService: StorageService) {
    this._storageService = storageService;

  }

  ngOnInit() {
    this.recepies = this._storageService.recipeCache;
    this._storageService.recipesChanged.subscribe((data) => {
      this.recepies = data;
    });

  }

  getImageForRecipe(recipeName: string): string {
    return localStorage.getItem(recipeName + '.png');
  }

}

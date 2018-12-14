import {Component, Input, OnInit} from '@angular/core';
import {FactorioRecipe} from "../../model/factorio-recipe";
import {StorageService} from "../../storage/storage.service";

@Component({
  selector: 'app-recepie-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  @Input()
  public CurrentRecipe: FactorioRecipe;
  private _storageService: StorageService;

  constructor(storageService: StorageService) {
    this._storageService = storageService;
  }

  ngOnInit(): void {

  }

  public getPictureByName(name: string): string {
    return StorageService.getIconByName(name);
  }

}

import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../storage/storage.service";
import {IFactorioRecipe} from "../../model/i-factorio-recipe";

@Component({
  selector: 'app-recepie-browser',
  templateUrl: './recipe-browser.component.html',
  styleUrls: ['./recipe-browser.component.sass']
})
export class RecipeBrowserComponent implements OnInit {
  private _storageService: StorageService;

  private _recepies: IFactorioRecipe[];

  constructor(storageService: StorageService) {
    this._storageService = storageService;

  }

  ngOnInit() {
    this._recepies = StorageService.retrieveRecepies();
    this._storageService.recepiesChanged.subscribe((data) => {
      this._recepies = data;
      console.log(this._recepies);
    });

    console.log(this._recepies);
  }

}

import {Component, Input, OnInit} from '@angular/core';
import {FactorioRecipe} from "../../model/factorio-recipe";

@Component({
  selector: 'app-recepie-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  @Input()
  public CurrentRecipe: FactorioRecipe;

  constructor() {
  }

  ngOnInit(): void {

  }

  public getPictureByName(name: string): string {
    return localStorage.getItem(name + ".png");
  }

}

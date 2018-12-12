import {Component, Input, OnInit} from '@angular/core';
import {IFactorioRecipe} from "../../model/i-factorio-recipe";

@Component({
  selector: 'app-recepie-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.sass']
})
export class RecipeDetailsComponent implements OnInit {

  @Input()
  public CurrentRecipe: IFactorioRecipe;
  public picture: string;

  constructor() {
  }

  ngOnInit(): void {
    this.picture = localStorage.getItem(this.CurrentRecipe.name + ".png");
  }


}

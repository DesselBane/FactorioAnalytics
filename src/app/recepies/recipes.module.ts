import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecipeBrowserComponent} from './recipe-browser/recipe-browser.component';
import {RecipeDetailsComponent} from './recipe-details/recipe-details.component';
import {RecipesRoutingModule} from "./recipes-routing.module";
import {MaterialMetaModule} from "../material-meta/material-meta.module";

@NgModule({
  declarations: [
    RecipeBrowserComponent,
    RecipeDetailsComponent
  ],
  imports: [
    CommonModule,
    MaterialMetaModule,

    RecipesRoutingModule
  ]
})
export class RecipesModule {
}

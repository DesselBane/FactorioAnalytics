import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecipeBrowserComponent} from './recipe-browser/recipe-browser.component';
import {RecipeDetailsComponent} from './recipe-details/recipe-details.component';
import {RecipesRoutingModule} from "./recipes-routing.module";
import {MaterialMetaModule} from "../material-meta/material-meta.module";
import {RecipeOverviewComponent} from './recipe-overview/recipe-overview.component';
import {PipesModule} from "../pipes/pipes.module";

@NgModule({
  declarations: [
    RecipeBrowserComponent,
    RecipeDetailsComponent,
    RecipeOverviewComponent
  ],
  imports: [
    CommonModule,
    MaterialMetaModule,
    PipesModule,

    RecipesRoutingModule
  ],
  exports: [
    RecipeDetailsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RecipesModule {
}

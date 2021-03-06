import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialMetaModule} from "../material-meta/material-meta.module";
import {RecipesModule} from "../recepies/recipes.module";
import {FormsModule} from "@angular/forms";
import {PipesModule} from "../pipes/pipes.module";
import {ViewModelsModule} from "../view-models/view-models.module";
import {CalculatorSettingsComponent} from "./calculator-settings/calculator-settings.component";
import {SettingsRoutingModule} from "./settings-routing.module";

@NgModule({
  declarations: [
    CalculatorSettingsComponent
  ],
  imports: [
    RecipesModule,
    FormsModule,
    PipesModule,
    ViewModelsModule,

    CommonModule,
    MaterialMetaModule,

    SettingsRoutingModule
  ],
  entryComponents: [
  ]
})
export class SettingsModule {
}

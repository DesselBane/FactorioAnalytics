import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialMetaModule} from "../material-meta/material-meta.module";
import {CalculatorRoutingModule} from "./calculator-routing.module";
import {RecipesModule} from "../recepies/recipes.module";
import {CalculatorOverviewComponent} from './calculator-overview/calculator-overview.component';
import {CalculatorDetailsComponent} from './calculator-details/calculator-details.component';
import {FormsModule} from "@angular/forms";
import {PipesModule} from "../pipes/pipes.module";
import {CalculatorHistoryComponent} from './calculator-history/calculator-history.component';
import {ViewModelsModule} from "../view-models/view-models.module";
import {SettingsModule} from "../settings/settings.module";

@NgModule({
  declarations: [
    CalculatorOverviewComponent,
    CalculatorDetailsComponent,
    CalculatorHistoryComponent,
  ],
  imports: [
    CommonModule,
    MaterialMetaModule,
    RecipesModule,
    FormsModule,
    PipesModule,
    ViewModelsModule,
    SettingsModule,


    CalculatorRoutingModule
  ]
})
export class CalculatorModule {
}

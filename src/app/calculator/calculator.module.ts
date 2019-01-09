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
import {AddModuleDialogComponent} from './calculator-details/add-module-dialog/add-module-dialog.component';

@NgModule({
  declarations: [
    CalculatorOverviewComponent,
    CalculatorDetailsComponent,
    CalculatorHistoryComponent,
    AddModuleDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialMetaModule,
    RecipesModule,
    FormsModule,
    PipesModule,



    CalculatorRoutingModule
  ],
  entryComponents: [
    AddModuleDialogComponent
  ]
})
export class CalculatorModule {
}

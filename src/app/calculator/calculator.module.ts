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
import {CalculatorSettingsComponent} from './calculator-settings/calculator-settings.component';
import {ViewModelsModule} from "../view-models/view-models.module";
import {LoadProfileSelectorDialogComponent} from './calculator-settings/load-profile-selector-dialog/load-profile-selector-dialog.component';

@NgModule({
  declarations: [
    CalculatorOverviewComponent,
    CalculatorDetailsComponent,
    CalculatorHistoryComponent,
    CalculatorSettingsComponent,
    LoadProfileSelectorDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialMetaModule,
    RecipesModule,
    FormsModule,
    PipesModule,
    ViewModelsModule,


    CalculatorRoutingModule
  ],
  entryComponents: [
    LoadProfileSelectorDialogComponent
  ]
})
export class CalculatorModule {
}

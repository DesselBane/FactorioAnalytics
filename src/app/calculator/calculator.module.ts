import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialMetaModule} from '../material-meta/material-meta.module';
import {CalculatorRoutingModule} from './calculator-routing.module';
import {RecipesModule} from '../recepies/recipes.module';
import {CalculatorOverviewComponent} from './calculator-overview/calculator-overview.component';
import {CalculatorDetailsComponent} from './calculator-details/calculator-details.component';
import {FormsModule} from '@angular/forms';
import {PipesModule} from '../pipes/pipes.module';
import {ViewModelsModule} from '../view-models/view-models.module';
import {SettingsModule} from '../settings/settings.module';
import {CalculatorGlobalsComponent} from './calculator-globals/calculator-globals.component';
import {CalculatorTreeViewComponent} from './calculator-tree-view/calculator-tree-view.component';
import {CalculatorTabNavComponent} from './calculator-tab-nav/calculator-tab-nav.component';

@NgModule({
  declarations: [
    CalculatorOverviewComponent,
    CalculatorDetailsComponent,
    CalculatorGlobalsComponent,
    CalculatorTreeViewComponent,
    CalculatorTabNavComponent,
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

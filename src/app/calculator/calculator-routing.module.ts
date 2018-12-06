import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CalculatorOverviewComponent} from "./calculator-overview/calculator-overview.component";

@NgModule({
  imports: [RouterModule.forRoot([{
    path: 'calculator/:id',
    component: CalculatorOverviewComponent
  }])],
  exports: [RouterModule]
})
export class CalculatorRoutingModule {
}

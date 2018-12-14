import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CalculatorOverviewComponent} from "./calculator-overview/calculator-overview.component";
import {CalculatorHistoryComponent} from "./calculator-history/calculator-history.component";

@NgModule({
  imports: [RouterModule.forRoot([{
    path: 'calculator',
    children: [
      {path: 'session/:id', component: CalculatorOverviewComponent},
      {path: 'history', component: CalculatorHistoryComponent}
    ]

  }])],
  exports: [RouterModule]
})
export class CalculatorRoutingModule {
}

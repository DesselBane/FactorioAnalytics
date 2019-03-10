import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CalculatorHistoryComponent} from './calculator-history/calculator-history.component';
import {CalculatorTabNavComponent} from './calculator-tab-nav/calculator-tab-nav.component';

@NgModule({
  imports: [RouterModule.forRoot([
    {
    path: 'calculator',
    children: [
      {path: 'sessions', component: CalculatorTabNavComponent},
      {path: 'history', component: CalculatorHistoryComponent}
    ]

    }
  ])],
  exports: [RouterModule]
})
export class CalculatorRoutingModule {
}

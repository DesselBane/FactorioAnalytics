import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CalculatorTabNavComponent} from './calculator-tab-nav/calculator-tab-nav.component';

@NgModule({
  imports: [RouterModule.forRoot([
    {
    path: 'calculator',
    children: [
      {path: 'sessions', component: CalculatorTabNavComponent},
    ]

    }
  ])],
  exports: [RouterModule]
})
export class CalculatorRoutingModule {
}

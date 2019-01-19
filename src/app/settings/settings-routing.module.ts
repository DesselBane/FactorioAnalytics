import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CalculatorSettingsComponent} from "./calculator-settings/calculator-settings.component";

@NgModule({
  imports: [RouterModule.forRoot([{
      path: 'settings',
      component: CalculatorSettingsComponent
    }]
  )],
  exports: [RouterModule]
})
export class SettingsRoutingModule {
}

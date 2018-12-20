import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {StorageModule} from "./storage/storage.module";
import {MaterialMetaModule} from "./material-meta/material-meta.module";
import {RecipesModule} from "./recepies/recipes.module";
import {CalculatorModule} from "./calculator/calculator.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MaterialMetaModule,


    StorageModule,
    RecipesModule,
    CalculatorModule,

    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialMetaModule} from "../material-meta/material-meta.module";
import {StorageRoutingModule} from "./storage-routing.module";
import {ImporterComponent} from "./importer/importer.component";

@NgModule({
  declarations: [
    ImporterComponent
  ],
  imports: [
    CommonModule,
    MaterialMetaModule,
    StorageRoutingModule
  ]
})
export class StorageModule {
}

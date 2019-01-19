import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialMetaModule} from "../material-meta/material-meta.module";
import {ModuleListComponent} from './module-list/module-list.component';
import {AddModuleDialogComponent} from "./add-module-dialog/add-module-dialog.component";
import {PipesModule} from "../pipes/pipes.module";
import {LoadProfileSelectorDialogComponent} from "./load-profile-selector-dialog/load-profile-selector-dialog.component";

@NgModule({
  declarations: [
    ModuleListComponent,
    AddModuleDialogComponent,
    LoadProfileSelectorDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialMetaModule,
    PipesModule

  ],
  exports: [ModuleListComponent
  ],
  entryComponents: [
    AddModuleDialogComponent,
    LoadProfileSelectorDialogComponent

  ]
})
export class ViewModelsModule {
}

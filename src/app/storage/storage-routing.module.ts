import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {ImporterComponent} from "./importer/importer.component";

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: 'storage',
        children: [
          {path: 'import', component: ImporterComponent}
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class StorageRoutingModule {
}

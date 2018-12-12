import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReplaceCharPipe} from './replace-char.pipe';

@NgModule({
  declarations: [
    ReplaceCharPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ReplaceCharPipe
  ]
})
export class PipesModule {
}

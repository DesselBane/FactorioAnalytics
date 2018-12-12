import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'replaceChar'
})
export class ReplaceCharPipe implements PipeTransform {

  transform(value: string, searchFor: string, replaceWith: string): any {
    return value.replace(new RegExp(searchFor, 'g'), replaceWith);
  }

}

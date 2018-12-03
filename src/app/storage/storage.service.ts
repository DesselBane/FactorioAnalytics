import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {

  }

  importFiles(files: File[]) {
    for (let value of files) {
      if (value.name.endsWith(".json")) {
        this.importRecepies(value);
        continue;
      }
      if (value.name.endsWith(".png"))
        this.importIcon(value);
    }
  }

  importRecepies(file: File) {
    let fileReader = new FileReader();
    fileReader.onload = (data: any) => console.log((JSON).parse(data.target.result));
    fileReader.readAsText(file);
  }

  importIcon(file: File) {

  }
}

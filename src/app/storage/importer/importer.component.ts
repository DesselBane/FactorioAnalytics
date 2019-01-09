import {Component, OnInit} from '@angular/core';
import {StorageService} from "../storage.service";

@Component({
  selector: 'app-importer',
  templateUrl: './importer.component.html',
  styleUrls: ['./importer.component.sass']
})
export class ImporterComponent implements OnInit {
  private _storageService: StorageService;

  constructor(storageService: StorageService) {
    this._storageService = storageService;
  }

  ngOnInit() {
  }

  on_btn_import_click(): void {
    let fileSelector = document.createElement('input');
    fileSelector.setAttribute('type', 'file');
    fileSelector.setAttribute('multiple', 'multiple');
    fileSelector.onchange = (filepath: any) => this._storageService.importFiles(filepath.target.files);
    fileSelector.click();

  }

  on_btn_clear_all_click() {
    StorageService.clearLocalStorage();
  }
}

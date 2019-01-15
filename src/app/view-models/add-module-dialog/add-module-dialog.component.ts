import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FactorioModule} from "../../model/factorio-module";
import {StorageService} from "../../storage/storage.service";

@Component({
  selector: 'app-add-module-dialog',
  templateUrl: './add-module-dialog.component.html',
  styleUrls: ['./add-module-dialog.component.css']
})
export class AddModuleDialogComponent implements OnInit {
  public _data: FactorioModule[];
  private _dialogRef: MatDialogRef<AddModuleDialogComponent>;

  constructor(dialogRef: MatDialogRef<AddModuleDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data: FactorioModule[]) {
    this._dialogRef = dialogRef;
    this._data = data;
  }

  ngOnInit() {
  }

  public acceptModule(module: FactorioModule) {
    this._dialogRef.close(module);
  }

  public cancel() {
    this._dialogRef.close(null);
  }

  getIconByName(name: string): string {
    return StorageService.getIconByName(name);
  }
}

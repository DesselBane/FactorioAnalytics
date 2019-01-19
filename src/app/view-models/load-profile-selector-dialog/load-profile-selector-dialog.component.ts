import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material";
import {SettingsService} from "../../settings/settings.service";

@Component({
  selector: 'app-load-profile-selector-dialog',
  templateUrl: './load-profile-selector-dialog.component.html',
  styleUrls: ['./load-profile-selector-dialog.component.css']
})
export class LoadProfileSelectorDialogComponent implements OnInit {
  public ProfileNames: string[];
  private _dialogRef: MatDialogRef<LoadProfileSelectorDialogComponent>;
  private _settingsService: SettingsService;

  constructor(dialogRef: MatDialogRef<LoadProfileSelectorDialogComponent>,
              settingsService: SettingsService) {
    this._dialogRef = dialogRef;
    this._settingsService = settingsService;
  }

  ngOnInit() {
    this.ProfileNames = this._settingsService.getProfileNames();
  }

  public acceptProfile(name: string) {
    this._dialogRef.close(name);
  }

  public cancel() {
    this._dialogRef.close(null);
  }

}

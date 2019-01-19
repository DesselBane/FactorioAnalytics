import {Component, Input, OnInit} from '@angular/core';
import {CalculatorSession} from "../../model/calculator-session";
import {SettingsService} from "../../settings/settings.service";
import {MatDialog} from "@angular/material";
import {LoadProfileSelectorDialogComponent} from "../../view-models/load-profile-selector-dialog/load-profile-selector-dialog.component";
import {Settings} from "../../model/settings";

@Component({
  selector: 'app-calculator-globals',
  templateUrl: './calculator-globals.component.html',
  styleUrls: ['./calculator-globals.component.css']
})
export class CalculatorGlobalsComponent implements OnInit {

  @Input()
  public RootSession: CalculatorSession;
  private _settingsService: SettingsService;
  private _dialog: MatDialog;

  constructor(settingsService: SettingsService,
              dialog: MatDialog) {
    this._settingsService = settingsService;
    this._dialog = dialog;
  }

  private static setProfileForSession(currentSession: CalculatorSession, settings: Settings) {
    let categorySettings = settings.craftingCategorySettings.find(x => x.category === currentSession.Recipe.category);

    if (categorySettings != null) {
      currentSession.CraftingMachine = categorySettings.craftingMachine;
      currentSession.Modules = [];
      currentSession.Beacons = [];

      Object.assign(categorySettings.modules, currentSession.Modules);
      Object.assign(categorySettings.beacons, currentSession.Beacons);
    }

    for (let subsession of currentSession.SubSessions) {
      this.setProfileForSession(subsession, settings);
    }
  }

  ngOnInit() {
  }

  on_btn_loadProfile() {
    let dialog = this._dialog.open(LoadProfileSelectorDialogComponent);
    dialog.afterClosed().subscribe(result => {
      if (result == null)
        return;

      let settings = this._settingsService.loadProfile(result);
      CalculatorGlobalsComponent.setProfileForSession(this.RootSession, settings);
    })
  }
}

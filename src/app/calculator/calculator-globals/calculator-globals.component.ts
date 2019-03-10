import {Component, Input, OnInit} from '@angular/core';
import {CalculatorSession} from '../../model/calculator-session';
import {SettingsService} from '../../settings/settings.service';
import {MatDialog} from '@angular/material';
import {LoadProfileSelectorDialogComponent} from '../../view-models/load-profile-selector-dialog/load-profile-selector-dialog.component';
import {CalculatorService} from '../calculator.service';

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
  private _calcService: CalculatorService;

  constructor(settingsService: SettingsService,
              dialog: MatDialog,
              calcService: CalculatorService) {
    this._settingsService = settingsService;
    this._dialog = dialog;
    this._calcService = calcService;
  }

  on_btn_loadProfile() {
    let dialog = this._dialog.open(LoadProfileSelectorDialogComponent);
    dialog.afterClosed().subscribe(result => {
      if (result == null)
        return;

      let settings = this._settingsService.loadProfile(result);
      this._calcService.setProfileForSession(this.RootSession, settings);
      this._calcService.updateForTargetAmount(this.RootSession);
    })
  }

  ngOnInit() {

  }

  onSaveSessionName() {
    this._calcService.storeSessions();
  }
}

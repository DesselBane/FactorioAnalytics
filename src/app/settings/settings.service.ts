import {Injectable} from '@angular/core';
import {Settings} from "../model/settings";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private static readonly settingsKey = "factorio-settings";

  private readonly _settings: Settings[];

  constructor() {
    this._settings = JSON.parse(localStorage.getItem(SettingsService.settingsKey)) || [];
  }

  public storeProfile(settings: Settings) {

    let index = this._settings.findIndex(x => x.name === settings.name);

    if (index === -1)
      this._settings.push(settings);
    else
      this._settings[index] = settings;

    localStorage.setItem(SettingsService.settingsKey, JSON.stringify(this._settings));
  }

  public loadProfile(name: string = ""): Settings {
    if (name == "")
      return this._settings[0];
    else
      return this._settings[this._settings.findIndex(x => x.name === name)];
  }

  public getProfileNames(): string[] {
    return this._settings.map(x => x.name);
  }

  public setAsDefaultProfile(name: string) {
    let index = this._settings.findIndex(x => x.name === name);

    if (index === -1)
      throw "Profile doesnt exist";

    let oldDefault = this._settings[0];
    this._settings[0] = this._settings[index];
    this._settings[index] = oldDefault;

    localStorage.setItem(SettingsService.settingsKey, JSON.stringify(this._settings));
  }

}

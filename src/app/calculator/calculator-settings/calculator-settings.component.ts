import {Component, OnInit} from '@angular/core';
import {CalculatorService} from "../calculator.service";
import {StorageService} from "../../storage/storage.service";
import {FactorioCraftingMachine} from "../../model/factorio-crafting-machine";
import {MatDialog, MatSelectionListChange} from "@angular/material";
import {FactorioModule} from "../../model/factorio-module";
import {Settings} from "../../model/settings";
import {CraftingCategorySetting} from "../../model/craftingCategorySetting";
import {SettingsService} from "../settings.service";
import {LoadProfileSelectorDialogComponent} from "./load-profile-selector-dialog/load-profile-selector-dialog.component";

@Component({
  selector: 'app-calculator-settings',
  templateUrl: './calculator-settings.component.html',
  styleUrls: ['./calculator-settings.component.css']
})
export class CalculatorSettingsComponent implements OnInit {
  private _currentProfile: Settings;
  public Modules: FactorioModule[];
  public GroupedCraftingMachines: [string, FactorioCraftingMachine[], CraftingCategorySetting][];
  private _calcService: CalculatorService;
  private _storageService: StorageService;
  private _settingsService: SettingsService;
  private _loadProfileDialog: MatDialog;

  constructor(calcService: CalculatorService,
              storageService: StorageService,
              settingsService: SettingsService,
              loadProfileDialog: MatDialog) {
    this._calcService = calcService;
    this._storageService = storageService;
    this._settingsService = settingsService;
    this._loadProfileDialog = loadProfileDialog;
  }

  get CurrentProfile(): Settings {
    return this._currentProfile;
  }

  ngOnInit() {
    this.Modules = this._storageService.modulesCache;
    this._currentProfile = this._settingsService.loadProfile();

    if (this._currentProfile == null)
      this._currentProfile = new Settings();

    this.updateGroupedCraftingMachines();
  }

  getIconByName(name: string) {
    return StorageService.getIconByName(name);
  }

  onCraftingMachineSelectionChanged($event: MatSelectionListChange, group: [string, FactorioCraftingMachine[], CraftingCategorySetting]) {

    let setting = this._currentProfile.craftingCategorySettings.find(x => x.category === group[2].category);

    setting.craftingMachine = $event.option.value;
    let moduleSizeDiff = setting.modules.length - setting.craftingMachine.moduleInventorySize;

    if (moduleSizeDiff > 0)
      setting.modules.splice(setting.modules.length - moduleSizeDiff, moduleSizeDiff);


    this.updateGroupedCraftingMachines();
  }

  //TODO put logic into service
  onAddModuleToCategory($event: FactorioModule, group: [string, FactorioCraftingMachine[], CraftingCategorySetting]) {
    this._currentProfile.craftingCategorySettings.find(x => x.category === group[2].category).modules.push($event);
    this.updateGroupedCraftingMachines();
  }

  onRemoveModuleFromCategory($event: FactorioModule, group: [string, FactorioCraftingMachine[], CraftingCategorySetting]) {
    let modules = this._currentProfile.craftingCategorySettings.find(x => x.category === group[2].category).modules;
    modules.splice(modules.findIndex(x => x.name === $event.name), 1);
    this.updateGroupedCraftingMachines();
  }

  onAddBeaconToCategory($event: FactorioModule, group: [string, FactorioCraftingMachine[], CraftingCategorySetting]) {
    this._currentProfile.craftingCategorySettings.find(x => x.category === group[2].category).beacons.push($event);
    this.updateGroupedCraftingMachines();
  }

  onRemoveBeaconFromCategory($event: FactorioModule, group: [string, FactorioCraftingMachine[], CraftingCategorySetting]) {
    let beacons = this._currentProfile.craftingCategorySettings.find(x => x.category === group[2].category).beacons;
    beacons.splice(beacons.findIndex(x => x.name === $event.name), 1);
    this.updateGroupedCraftingMachines();
  }

  on_btn_save() {
    this._settingsService.storeProfile(this._currentProfile);
  }

  on_btn_makeDefault() {
    this.on_btn_save();
    this._settingsService.setAsDefaultProfile(this._currentProfile.name);
  }

  on_btn_load() {
    let dialog = this._loadProfileDialog.open(LoadProfileSelectorDialogComponent);

    dialog.afterClosed()
      .subscribe(result => {
        if (result == null)
          return;

        this._currentProfile = this._settingsService.loadProfile(result);
        this.updateGroupedCraftingMachines();
      })
  }

  on_btn_new() {
    this._currentProfile = new Settings();
    this.updateGroupedCraftingMachines();
  }

  private updateGroupedCraftingMachines() {
    let result: [string, FactorioCraftingMachine[], CraftingCategorySetting][] = [];
    let craftingMachines = this._storageService.craftingMachineCache;

    for (let machine of craftingMachines)
      for (let category of machine.craftingCategories) {
        let index = result.findIndex(x => x[0] === category);

        if (index === -1) {
          let settingsIndex = this._currentProfile.craftingCategorySettings.findIndex(x => x.category === category);
          let setting;

          if (settingsIndex === -1) {
            setting = new CraftingCategorySetting(category);
            this._currentProfile.craftingCategorySettings.push(setting);
          } else
            setting = this._currentProfile.craftingCategorySettings[settingsIndex];

          result.push([category, [machine], setting]);
        }
        else
          result[index][1].push(machine);
      }

    this.GroupedCraftingMachines = result;
  }
}

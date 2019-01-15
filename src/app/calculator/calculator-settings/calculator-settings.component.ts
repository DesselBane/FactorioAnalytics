import {Component, OnInit} from '@angular/core';
import {CalculatorService} from "../calculator.service";
import {StorageService} from "../../storage/storage.service";
import {FactorioCraftingMachine} from "../../model/factorio-crafting-machine";
import {MatSelectionListChange} from "@angular/material";
import {FactorioModule} from "../../model/factorio-module";
import {Settings} from "../../model/settings";
import {CraftingCategorySetting} from "../../model/craftingCategorySetting";

@Component({
  selector: 'app-calculator-settings',
  templateUrl: './calculator-settings.component.html',
  styleUrls: ['./calculator-settings.component.css']
})
export class CalculatorSettingsComponent implements OnInit {
  public Modules: FactorioModule[];
  public GroupedCraftingMachines: [string, FactorioCraftingMachine[], CraftingCategorySetting][];
  private _calcService: CalculatorService;
  private _storageService: StorageService;
  private _settings: Settings;

  constructor(calcService: CalculatorService,
              storageService: StorageService) {
    this._calcService = calcService;
    this._storageService = storageService;
  }

  ngOnInit() {
    this.Modules = this._storageService.modulesCache;
    this._settings = StorageService.loadSettings();

    if (this._settings == null)
      this._settings = new Settings();

    this.updateGroupedCraftingMachines();

  }

  getIconByName(name: string) {
    return StorageService.getIconByName(name);
  }

  onCraftingMachineSelectionChanged($event: MatSelectionListChange, group: [string, FactorioCraftingMachine[], CraftingCategorySetting]) {

    let setting = this._settings.craftingCategorySettings.find(x => x.category === group[2].category);

    setting.craftingMachine = $event.option.value;
    let moduleSizeDiff = setting.modules.length - setting.craftingMachine.moduleInventorySize;

    if (moduleSizeDiff > 0)
      setting.modules.splice(setting.modules.length - moduleSizeDiff, moduleSizeDiff);


    StorageService.storeSettings(this._settings);
    this.updateGroupedCraftingMachines();
  }

  onAddModuleToCategory($event: FactorioModule, group: [string, FactorioCraftingMachine[], CraftingCategorySetting]) {
    this._settings.craftingCategorySettings.find(x => x.category === group[2].category).modules.push($event);
    StorageService.storeSettings(this._settings);
    this.updateGroupedCraftingMachines();
  }

  onRemoveModuleFromCategory($event: FactorioModule, group: [string, FactorioCraftingMachine[], CraftingCategorySetting]) {
    let modules = this._settings.craftingCategorySettings.find(x => x.category === group[2].category).modules;
    modules.splice(modules.findIndex(x => x.name === $event.name), 1);
    StorageService.storeSettings(this._settings);
    this.updateGroupedCraftingMachines();
  }

  onAddBeaconToCategory($event: FactorioModule, group: [string, FactorioCraftingMachine[], CraftingCategorySetting]) {
    this._settings.craftingCategorySettings.find(x => x.category === group[2].category).beacons.push($event);
    StorageService.storeSettings(this._settings);
    this.updateGroupedCraftingMachines();
  }

  onRemoveBeaconFromCategory($event: FactorioModule, group: [string, FactorioCraftingMachine[], CraftingCategorySetting]) {
    let beacons = this._settings.craftingCategorySettings.find(x => x.category === group[2].category).beacons;
    beacons.splice(beacons.findIndex(x => x.name === $event.name), 1);
    StorageService.storeSettings(this._settings);
    this.updateGroupedCraftingMachines();
  }

  private updateGroupedCraftingMachines() {
    let result: [string, FactorioCraftingMachine[], CraftingCategorySetting][] = [];
    let craftingMachines = this._storageService.craftingMachineCache;

    for (let machine of craftingMachines)
      for (let category of machine.craftingCategories) {
        let index = result.findIndex(x => x[0] === category);

        if (index === -1) {
          let settingsIndex = this._settings.craftingCategorySettings.findIndex(x => x.category === category);
          let setting;

          if (settingsIndex === -1) {
            setting = new CraftingCategorySetting(category);
            this._settings.craftingCategorySettings.push(setting);
          } else
            setting = this._settings.craftingCategorySettings[settingsIndex];

          result.push([category, [machine], setting]);
        }
        else
          result[index][1].push(machine);
      }

    this.GroupedCraftingMachines = result;
  }
}

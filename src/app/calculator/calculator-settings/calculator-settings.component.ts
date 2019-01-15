import {Component, OnInit} from '@angular/core';
import {CalculatorService} from "../calculator.service";
import {StorageService} from "../../storage/storage.service";
import {FactorioCraftingMachine} from "../../model/factorio-crafting-machine";
import {MatSelectionListChange} from "@angular/material";
import {FactorioModule} from "../../model/factorio-module";

@Component({
  selector: 'app-calculator-settings',
  templateUrl: './calculator-settings.component.html',
  styleUrls: ['./calculator-settings.component.css']
})
export class CalculatorSettingsComponent implements OnInit {
  public Modules: FactorioModule[];
  public GroupedCraftingMachines: [string, FactorioCraftingMachine[]][];
  private _calcService: CalculatorService;
  private _storageService: StorageService;

  constructor(calcService: CalculatorService,
              storageService: StorageService) {
    this._calcService = calcService;
    this._storageService = storageService;
  }

  ngOnInit() {
    this.updateGroupedCraftingMachines();
    this.Modules = this._storageService.modulesCache;
  }

  getIconByName(name: string) {
    return StorageService.getIconByName(name);
  }

  onCraftingMachineSelectionChanged($event: MatSelectionListChange) {
    console.log("changed" + $event);
  }

  private updateGroupedCraftingMachines() {
    let result: [string, FactorioCraftingMachine[]][] = [];
    let craftingMachines = this._storageService.craftingMachineCache;

    for (let machine of craftingMachines)
      for (let category of machine.craftingCategories) {
        let index = result.findIndex(x => x[0] === category);

        if (index === -1)
          result.push([category, [machine]]);
        else
          result[index][1].push(machine);
      }

    this.GroupedCraftingMachines = result;
  }
}

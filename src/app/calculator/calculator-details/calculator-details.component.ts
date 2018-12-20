import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {CalculatorSession} from "../../model/calculator-session";
import {CalculatorService} from "../calculator.service";
import {StorageService} from "../../storage/storage.service";
import {FactorioRecipe} from "../../model/factorio-recipe";
import {FactorioCraftingMachine} from "../../model/factorio-crafting-machine";
import {MatListOption, MatSelectionList, MatSelectionListChange} from "@angular/material";
import {SelectionModel} from "@angular/cdk/collections";

@Component({
  selector: 'app-calculator-details',
  templateUrl: './calculator-details.component.html',
  styleUrls: ['./calculator-details.component.css']
})
export class CalculatorDetailsComponent implements OnInit {

  public CraftingMachines: FactorioCraftingMachine[];

  @Input()
  public CurrentSession: CalculatorSession;
  private _calcService: CalculatorService;
  private _storageService: StorageService;
  @ViewChild(MatSelectionList)
  private _selectionList: MatSelectionList;

  public limitationsData = [
    {
      name: 'Transport Belt',
      value: 13.3
    },
    {
      name: 'Fast Transport Belt',
      value: 26.7
    },
    {
      name: 'Express Transport Belt',
      value: 40
    }
  ];


  constructor(calcService: CalculatorService,
              storageService: StorageService) {
    this._calcService = calcService;
    this._storageService = storageService;
  }

  ngOnInit() {
    this.CraftingMachines = this._storageService.craftingMachineCache;
    this._selectionList.selectedOptions = new SelectionModel<MatListOption>(false);
  }

  public getIconByName(name: string): string {
    return StorageService.getIconByName(name);
  }

  targetAmountChanged() {
    this._calcService.updateForTargetAmount(this.CurrentSession);
  }

  public recipeCanBeCraftedInMachine(recipe: FactorioRecipe, craftingMachine: FactorioCraftingMachine): boolean {
    return CalculatorService.recipeCanBeCraftedInMachine(recipe, craftingMachine);
  }

  onCraftingMachineSelectionChanged($event: MatSelectionListChange) {
    this._calcService.updateCraftingMachine(this.CurrentSession, $event.option.value);
    this._calcService.updateForTargetAmount(this.CurrentSession);
  }

  btn_add_limitation() {
    console.log("adding limitations");
  }
}


import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {CalculatorSession} from "../../model/calculator-session";
import {CalculatorService} from "../calculator.service";
import {StorageService} from "../../storage/storage.service";
import {FactorioRecipe} from "../../model/factorio-recipe";
import {FactorioCraftingMachine} from "../../model/factorio-crafting-machine";
import {MatDialog, MatListOption, MatSelectionList, MatSelectionListChange, MatSnackBar} from "@angular/material";
import {SelectionModel} from "@angular/cdk/collections";
import {FactorioModule} from "../../model/factorio-module";
import {AddModuleDialogComponent} from "./add-module-dialog/add-module-dialog.component";
import {ModuleGroup} from "../../model/module.group";

@Component({
  selector: 'app-calculator-details',
  templateUrl: './calculator-details.component.html',
  styleUrls: ['./calculator-details.component.css']
})
export class CalculatorDetailsComponent implements OnInit {

  public CraftingMachines: FactorioCraftingMachine[];
  public Modules: FactorioModule[];

  public ModuleGroups: ModuleGroup[];

  @Input()
  public CurrentSession: CalculatorSession;
  private _calcService: CalculatorService;
  private _storageService: StorageService;
  @ViewChild(MatSelectionList)
  private _selectionList: MatSelectionList;

  //TODO get limitations from some store
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
  private _addModuleDialog: MatDialog;
  private _snackbar: MatSnackBar;


  constructor(calcService: CalculatorService,
              storageService: StorageService,
              addModuleDialog: MatDialog,
              snackbar: MatSnackBar) {
    this._calcService = calcService;
    this._storageService = storageService;
    this._addModuleDialog = addModuleDialog;
    this._snackbar = snackbar;
  }

  ngOnInit() {
    this.CraftingMachines = this._storageService.craftingMachineCache;
    this._selectionList.selectedOptions = new SelectionModel<MatListOption>(false);
    this.Modules = this._storageService.modulesCache;
    this.updateModuleGroups();
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
    this.updateModuleGroups();
  }

  btn_add_limitation() {
    console.log("adding limitations");
  }

  on_btn_add_module_click() {
    this.openAddModuleDialog();
  }

  on_btn_remove_module_click(module: FactorioModule) {
    this._calcService.removeModule(this.CurrentSession, module);
    this.updateModuleGroups();
  }

  public addModule(module: FactorioModule) {
    try {
      this._calcService.addModuleToSession(this.CurrentSession, module);
      this.updateModuleGroups();
    } catch (error) {
      this._snackbar.open(error, 'I\'ll do better.', {
        duration: 10000
      });
    }
  }

  private openAddModuleDialog() {
    const dialogRef = this._addModuleDialog.open(AddModuleDialogComponent, {
      data: this.Modules
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result != null)
          this.addModule(result);
      });
  }

  private updateModuleGroups() {
    let result = [];

    for (let module of this.CurrentSession.Modules) {
      let indexOfExistingGroup = result.findIndex(x => x.module.name === module.name);

      if (indexOfExistingGroup === -1)
        result.push({module: module, count: 1});
      else
        result[indexOfExistingGroup].count += 1;

    }

    this.ModuleGroups = result;
  }
}


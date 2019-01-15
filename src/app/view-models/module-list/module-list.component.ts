import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FactorioModule} from "../../model/factorio-module";
import {StorageService} from "../../storage/storage.service";
import {MatDialog} from "@angular/material";
import {AddModuleDialogComponent} from "../add-module-dialog/add-module-dialog.component";
import {ModuleGroup} from "../../model/module.group";

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.css']
})
export class ModuleListComponent implements OnInit {
  public ModuleGroups: ModuleGroup[];
  @Input()
  public AvailableModules: FactorioModule[];
  @Input()
  public Title: string;
  @Output()
  public AddModule = new EventEmitter<FactorioModule>();
  @Output()
  public RemoveModule = new EventEmitter<FactorioModule>();
  private _selectedModules: FactorioModule[];
  private _addModuleDialog: MatDialog;

  constructor(addModuleDialog: MatDialog) {
    this._addModuleDialog = addModuleDialog;
  }

  public get SelectedModules(): FactorioModule[] {
    return this._selectedModules;
  }

  @Input()
  public set SelectedModules(modules: FactorioModule[]) {
    this._selectedModules = modules;
    this.updateModuleGroups();
  }

  private _MaxNumberOfModules: number;

  get MaxNumberOfModules(): number {
    return this._MaxNumberOfModules;
  }

  @Input()
  set MaxNumberOfModules(value: number) {
    this._MaxNumberOfModules = value;
    this.updateModuleGroups();
  }

  ngOnInit() {
  }

  getIconByName(name: any) {
    return StorageService.getIconByName(name);
  }

  on_btn_add_module_click() {
    const dialogRef = this._addModuleDialog.open(AddModuleDialogComponent, {
      data: this.AvailableModules
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result != null)
          this.addModule(result);
      });
  }

  addModule(module: FactorioModule) {
    this.AddModule.emit(module);
    this.updateModuleGroups();
  }

  on_btn_remove_module_click(module: FactorioModule) {
    this.RemoveModule.emit(module);
    this.updateModuleGroups();
  }

  private updateModuleGroups() {
    if (this.SelectedModules == null)
      return;

    let result = [];

    for (let module of this.SelectedModules) {
      let indexOfExistingGroup = result.findIndex(x => x.module.name === module.name);

      if (indexOfExistingGroup === -1)
        result.push({module: module, count: 1});
      else
        result[indexOfExistingGroup].count += 1;

    }

    this.ModuleGroups = result;
  }
}


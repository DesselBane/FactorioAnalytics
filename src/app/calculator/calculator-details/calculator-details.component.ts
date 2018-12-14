import {Component, Input, OnInit} from '@angular/core';
import {CalculatorSession} from "../../model/calculator-session";
import {CalculatorService} from "../calculator.service";
import {StorageService} from "../../storage/storage.service";

@Component({
  selector: 'app-calculator-details',
  templateUrl: './calculator-details.component.html',
  styleUrls: ['./calculator-details.component.css']
})
export class CalculatorDetailsComponent implements OnInit {

  @Input()
  public CurrentSession: CalculatorSession;
  private _calcService: CalculatorService;
  private _storageService: StorageService;

  constructor(calcService: CalculatorService,
              storageService: StorageService) {
    this._calcService = calcService;
    this._storageService = storageService;
  }

  ngOnInit() {
  }

  public getIconByName(name: string): string {
    return StorageService.getIconByName(name);
  }

  targetAmountChanged() {
    this._calcService.updateForTargetAmount(this.CurrentSession);
  }
}

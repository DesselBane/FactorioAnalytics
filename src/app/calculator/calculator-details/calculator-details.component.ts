import {Component, Input, OnInit} from '@angular/core';
import {CalculatorSession} from "../../model/calculator-session";
import {CalculatorService} from "../calculator.service";

@Component({
  selector: 'app-calculator-details',
  templateUrl: './calculator-details.component.html',
  styleUrls: ['./calculator-details.component.css']
})
export class CalculatorDetailsComponent implements OnInit {

  @Input()
  public CurrentSession: CalculatorSession;
  private _calcService: CalculatorService;

  constructor(calcService: CalculatorService) {
    this._calcService = calcService;
  }

  ngOnInit() {
  }

  public getIconByName(name: string): string {
    return localStorage.getItem(name + '.png');
  }

  targetAmountChanged() {
    this._calcService.updateForTargetAmount(this.CurrentSession);
  }
}

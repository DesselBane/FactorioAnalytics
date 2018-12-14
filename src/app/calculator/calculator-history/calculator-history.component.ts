import {Component, OnInit} from '@angular/core';
import {CalculatorService} from "../calculator.service";
import {CalculatorSession} from "../../model/calculator-session";
import {of} from "rxjs";

@Component({
  selector: 'app-calculator-history',
  templateUrl: './calculator-history.component.html',
  styleUrls: ['./calculator-history.component.css']
})
export class CalculatorHistoryComponent implements OnInit {
  public CurrentSessions: CalculatorSession[] = [];
  private _calcService: CalculatorService;

  constructor(calcService: CalculatorService) {
    this._calcService = calcService;
  }

  ngOnInit() {
    of(this._calcService.getAllSessions()).subscribe((newData) => this.CurrentSessions = newData);
  }

  btn_deleteSession(session: CalculatorSession) {
    this._calcService.removeSession(session.SessionId);
  }

  public getIconByName(name: string): string {
    return localStorage.getItem(name + '.png');
  }
}

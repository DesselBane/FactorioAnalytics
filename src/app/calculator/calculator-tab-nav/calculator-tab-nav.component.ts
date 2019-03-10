import {Component, OnInit} from '@angular/core';
import {CalculatorService} from '../calculator.service';
import {CalculatorSession} from '../../model/calculator-session';

@Component({
  selector: 'app-calculator-tab-nav',
  templateUrl: './calculator-tab-nav.component.html',
  styleUrls: ['./calculator-tab-nav.component.css']
})
export class CalculatorTabNavComponent implements OnInit {

  public ActiveCalcSessions: CalculatorSession[];
  private _calcService: CalculatorService;

  constructor(calcService: CalculatorService) {
    this._calcService = calcService;

    this.ActiveCalcSessions = this._calcService.getAllSessions();

  }

  ngOnInit() {

  }

  onCloseTab(mouseEvent: MouseEvent, session: CalculatorSession) {
    mouseEvent.stopPropagation();
    this._calcService.removeSession(session.SessionId);
    this.ActiveCalcSessions = this._calcService.getAllSessions();
  }
}

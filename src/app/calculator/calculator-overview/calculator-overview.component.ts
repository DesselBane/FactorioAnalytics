import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CalculatorService} from '../calculator.service';
import {CalculatorSession} from '../../model/calculator-session';

@Component({
  selector: 'app-calculator-overview',
  templateUrl: './calculator-overview.component.html',
  styleUrls: ['./calculator-overview.component.css']
})
export class CalculatorOverviewComponent implements OnInit {

  private _activatedRoute: ActivatedRoute;
  private _calculatorService: CalculatorService;
  public RootSession: CalculatorSession;

  @Input()
  public SessionId: string;

  constructor(activatedRoute: ActivatedRoute,
              calculatorService: CalculatorService) {
    this._activatedRoute = activatedRoute;
    this._calculatorService = calculatorService;
  }

  ngOnInit() {
    this.RootSession = this._calculatorService.getSession(this.SessionId);
  }

}

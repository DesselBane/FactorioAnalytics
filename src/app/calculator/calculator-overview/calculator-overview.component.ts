import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CalculatorService} from "../calculator.service";
import {CalculatorSession} from "../../model/calculator-session";

@Component({
  selector: 'app-calculator-overview',
  templateUrl: './calculator-overview.component.html',
  styleUrls: ['./calculator-overview.component.sass']
})
export class CalculatorOverviewComponent implements OnInit {

  public CurrentSession: CalculatorSession;
  private _activatedRoute: ActivatedRoute;
  private _calculatorService: CalculatorService;

  constructor(activatedRoute: ActivatedRoute,
              calculatorService: CalculatorService) {
    this._activatedRoute = activatedRoute;
    this._calculatorService = calculatorService;
  }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(x => {
      this.CurrentSession = this._calculatorService.getSession(x.get('id'));
      console.log(this.CurrentSession);
    });
  }

  updateSession() {
    CalculatorService.update(this.CurrentSession);
  }

  updateSubsessions() {
    this._calculatorService.updateSubsessions(this.CurrentSession);
    console.log(this.CurrentSession);
  }
}

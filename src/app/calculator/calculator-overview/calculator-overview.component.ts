import {Component, OnInit} from '@angular/core';
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


  constructor(activatedRoute: ActivatedRoute,
              calculatorService: CalculatorService) {
    this._activatedRoute = activatedRoute;
    this._calculatorService = calculatorService;
  }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(x => {
      this.RootSession = this._calculatorService.getSession(x.get('id'));
    });
  }

}

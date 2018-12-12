import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CalculatorService} from "../calculator.service";
import {CalculatorSession} from "../../model/calculator-session";
import {NestedTreeControl} from "@angular/cdk/tree";
import {MatTreeNestedDataSource} from "@angular/material";
import {of} from "rxjs";

@Component({
  selector: 'app-calculator-overview',
  templateUrl: './calculator-overview.component.html',
  styleUrls: ['./calculator-overview.component.css']
})
export class CalculatorOverviewComponent implements OnInit {

  private _activatedRoute: ActivatedRoute;
  private _calculatorService: CalculatorService;
  public nestedTreeControl: NestedTreeControl<CalculatorSession>;
  public nestedDataSource: MatTreeNestedDataSource<any>;
  private _rootSession: CalculatorSession;


  constructor(activatedRoute: ActivatedRoute,
              calculatorService: CalculatorService) {
    this._activatedRoute = activatedRoute;
    this._calculatorService = calculatorService;

    this.nestedTreeControl = new NestedTreeControl<CalculatorSession>((node: CalculatorSession) => of(node.SubSessions));
    this.nestedDataSource = new MatTreeNestedDataSource();


  }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(x => {
      this._rootSession = this._calculatorService.getSession(x.get('id'));
      this.nestedDataSource.data = [this._rootSession];
      console.log(this.nestedDataSource.data);
    });
  }

  hasNestedChildren = (_: number, nodeData: CalculatorSession) => nodeData.SubSessions.length > 0;
}

import {Component, Input, OnInit} from '@angular/core';
import {CalculatorSession} from "../../model/calculator-session";

@Component({
  selector: 'app-calculator-details',
  templateUrl: './calculator-details.component.html',
  styleUrls: ['./calculator-details.component.css']
})
export class CalculatorDetailsComponent implements OnInit {

  @Input()
  public CurrentSession: CalculatorSession;

  constructor() {
  }

  ngOnInit() {
  }
}

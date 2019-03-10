import {Component, Input, OnInit} from '@angular/core';
import {CalculatorSession} from '../../model/calculator-session';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material';
import {of} from 'rxjs';

@Component({
  selector: 'app-calculator-tree-view',
  templateUrl: './calculator-tree-view.component.html',
  styleUrls: ['./calculator-tree-view.component.css']
})
export class CalculatorTreeViewComponent implements OnInit {

  public nestedTreeControl: NestedTreeControl<CalculatorSession>;
  public nestedDataSource: MatTreeNestedDataSource<any>;

  @Input()
  public RootSession: CalculatorSession;

  constructor() {
    this.nestedTreeControl = new NestedTreeControl<CalculatorSession>((node: CalculatorSession) => of(node.SubSessions));
    this.nestedDataSource = new MatTreeNestedDataSource();
  }

  ngOnInit() {
    this.nestedDataSource.data = [this.RootSession];

  }

  hasNestedChildren = (_: number, nodeData: CalculatorSession) => nodeData.SubSessions.length > 0;
}

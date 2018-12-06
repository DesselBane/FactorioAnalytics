import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {IFactorioRecipe} from "../../model/i-factorio-recipe";
import {StorageService} from "../../storage/storage.service";
import {CalculatorService} from "../../calculator/calculator.service";

@Component({
  selector: 'app-recipe-overview',
  templateUrl: './recipe-overview.component.html',
  styleUrls: ['./recipe-overview.component.sass']
})
export class RecipeOverviewComponent implements OnInit {
  public _currentRecipe: IFactorioRecipe;
  private _activatedRoute: ActivatedRoute;
  private _storageService: StorageService;
  private _calculatorService: CalculatorService;
  private _router: Router;

  constructor(activatedRoute: ActivatedRoute,
              storageService: StorageService,
              calculatorService: CalculatorService,
              router: Router) {
    this._activatedRoute = activatedRoute;
    this._storageService = storageService;
    this._calculatorService = calculatorService;
    this._router = router;
  }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe((params: ParamMap) => this._currentRecipe = this._storageService.getRecipeByName(params.get('id')));
  }

  createCalculatorSession() {
    let sessionId = this._calculatorService.createSession(this._currentRecipe.name);
    this._router.navigateByUrl("calculator/" + sessionId);
  }
}

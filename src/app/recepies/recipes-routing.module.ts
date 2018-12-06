import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {RecipeBrowserComponent} from "./recipe-browser/recipe-browser.component";
import {RecipeOverviewComponent} from "./recipe-overview/recipe-overview.component";

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: 'recipes',
      children: [
        {path: 'browse', component: RecipeBrowserComponent},
        {path: 'details/:id', component: RecipeOverviewComponent}
      ]
    }
  ])],
  exports: [RouterModule]
})
export class RecipesRoutingModule {
}

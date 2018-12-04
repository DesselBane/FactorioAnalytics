import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {RecipeBrowserComponent} from "./recipe-browser/recipe-browser.component";
import {RecipeDetailsComponent} from "./recipe-details/recipe-details.component";

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: 'recipes',
      children: [
        {path: 'browse', component: RecipeBrowserComponent},
        {path: 'details/:id', component: RecipeDetailsComponent}
      ]
    }
  ])],
  exports: [RouterModule]
})
export class RecipesRoutingModule {
}

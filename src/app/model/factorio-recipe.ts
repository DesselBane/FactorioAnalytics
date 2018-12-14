import {FactorioItem} from "./i-factorio-item";


export class FactorioRecipe {
  category: string;
  energy: number;
  ingredients: FactorioItem[] = [];
  name: string;
  product: FactorioItem;

  public static Parse(data: any): FactorioRecipe {
    if (typeof data === "string")
      data = JSON.parse(data);

    let result = new FactorioRecipe();

    result.category = data.category;
    result.energy = data.energy;
    result.name = data.name;
    result.product = FactorioItem.Parse(data.products[0]);

    for (let ingredient of data.ingredients) {
      result.ingredients.push(FactorioItem.Parse(ingredient));
    }

    return result;
  }

}

import {FactorioItem, IFactorioItem} from "./i-factorio-item";

export interface IFactorioRecipe {
  category: string;
  energy: number;
  name: string;
  ingredients: IFactorioItem[];
  product: IFactorioItem;
}

export class FactorioRecipe implements IFactorioRecipe {
  category: string;
  energy: number;
  ingredients: IFactorioItem[] = [];
  name: string;
  product: IFactorioItem;

  public static Parse(data: any): IFactorioRecipe {
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

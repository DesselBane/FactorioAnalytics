import {FactorioItem, IFactorioItem} from "./i-factorio-item";

export interface IFactorioRecipe {
  category: string;
  energy: number;
  name: string;
  ingredients: IFactorioItem[];
  products: IFactorioItem[];
}

export class FactorioRecipe implements IFactorioRecipe {
  category: string;
  energy: number;
  ingredients: IFactorioItem[] = [];
  name: string;
  products: IFactorioItem[] = [];

  public static Parse(data: any): IFactorioRecipe {
    if (typeof data === "string")
      data = JSON.parse(data);

    let result = new FactorioRecipe();

    result.category = data.category;
    result.energy = data.energy;
    result.name = data.name;

    for (let ingredient of data.ingredients) {
      result.ingredients.push(FactorioItem.Parse(ingredient));
    }

    for (let product of data.products) {
      result.products.push(FactorioItem.Parse(product))
    }

    return result;
  }

}

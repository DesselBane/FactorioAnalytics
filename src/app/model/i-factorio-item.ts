export interface IFactorioItem {
  amount: number;
  name: string;
}

export class FactorioItem implements IFactorioItem {
  amount: number;
  name: string;


  public static Parse(data: any): IFactorioItem {
    if (typeof data === "string")
      data = JSON.parse(data);

    let result = new FactorioItem();

    result.amount = data.amount;
    result.name = data.name;

    return result;
  }

}

export class FactorioItem {
  amount: number;
  name: string;


  public static Parse(data: any): FactorioItem {
    if (typeof data === "string")
      data = JSON.parse(data);

    let result = new FactorioItem();

    result.amount = data.amount;
    result.name = data.name;

    return result;
  }

}

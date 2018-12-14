export class FactorioCraftingMachine {

  name: string;
  type: string;
  ingredientCount: number;
  craftingSpeed: number;
  craftingCategories: string[] = [];
  moduleInventorySize: number;

  public static Parse(data: any): FactorioCraftingMachine {
    let result = new FactorioCraftingMachine();

    result.name = data.name;
    result.type = data.type;
    result.ingredientCount = data.ingredient_count;
    result.craftingSpeed = data.crafting_speed;
    result.moduleInventorySize = data.module_inventory_size;

    for (let category of Object.keys(data.crafting_categories)) {
      result.craftingCategories.push(category);
    }

    return result;
  }

}

export class FactorioModule {
  name: string;
  moduleEffects: [string, number][] = [];

  public static Parse(data: any): FactorioModule {
    let result = new FactorioModule();

    result.name = data.name;

    for (let effect of Object.entries(data.module_effects)) {
      let name = effect[0];
      let bonus = (effect[1] as any).bonus;

      result.moduleEffects.push([name, bonus])
    }

    return result;
  }
}

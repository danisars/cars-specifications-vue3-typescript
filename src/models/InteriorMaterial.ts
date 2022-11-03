import { CarInterior } from "../interface/car";

export class InteriorMaterial {
  constructor(public name: string) {}
}

export class InteriorMaterialLeather extends InteriorMaterial {
  constructor() {
    super("Leather");
  }
}
export class InteriorMaterialNylon extends InteriorMaterial {
  constructor() {
    super("Nylon");
  }
}
export class InteriorMaterialVinyl extends InteriorMaterial {
  constructor() {
    super("Vinyl");
  }
}
export class InteriorMaterialFabric extends InteriorMaterial {
  constructor() {
    super("Fabric");
  }
}

export class InteriorMaterialFactory {
  static create(interior: CarInterior) {
    if (interior === CarInterior.Leather) return new InteriorMaterialLeather();
    if (interior === CarInterior.Nylon) return new InteriorMaterialNylon();
    if (interior === CarInterior.Vinyl) return new InteriorMaterialVinyl();
    return new InteriorMaterialFabric();
  }
}

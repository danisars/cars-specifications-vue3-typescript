import { CarEngine } from "../interface/car";

export class Engine {
  constructor(public name: string) {}
}

export class EngineV6 extends Engine {
  constructor() {
    super("V6");
  }
}
export class EngineV8 extends Engine {
  constructor() {
    super("V8");
  }
}
export class EngineFourCylinder extends Engine {
  constructor() {
    super("The Four Cylinder");
  }
}
export class EngineStraightSix extends Engine {
  constructor() {
    super("Straight Six");
  }
}

export class EngineFactory {
  static create(engineType: CarEngine): Engine {
    if (engineType === CarEngine.V6) return new EngineV6();
    if (engineType === CarEngine.V8) return new EngineV8();
    if (engineType === CarEngine.FourCylinder) return new EngineFourCylinder();
    return new EngineStraightSix();
  }
}

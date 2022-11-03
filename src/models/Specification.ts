import { Exterior } from "./Exterior";
import { Engine } from "./Engine";
import { InteriorMaterial } from "./InteriorMaterial";

export class Specification {
  constructor(
    public name: string,
    public exterior: Exterior,
    public engine: Engine,
    public interiorMaterial: InteriorMaterial
  ) {}
}

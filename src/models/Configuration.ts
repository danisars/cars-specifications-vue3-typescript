import { Specification } from "./Specification";
import { Exterior } from "./Exterior";
import { ColorRed, ColorType } from "./Color";
import { Wheel, WheelModel, WheelRims } from "./Wheel";
import { EngineStraightSix } from "./Engine";
import { InteriorMaterialVinyl } from "./InteriorMaterial";

export class Configuration {
  private specifications: Specification[] = [
    new Specification(
      "Sport",
      new Exterior(
        new ColorRed(ColorType.Metallic),
        new Wheel(WheelRims.AlloyRims, WheelModel.Spoke)
      ),
      new EngineStraightSix(),
      new InteriorMaterialVinyl()
    ),
    new Specification(
      "Standard",
      new Exterior(
        new ColorRed(ColorType.Metallic),
        new Wheel(WheelRims.AlloyRims, WheelModel.Spoke)
      ),
      new EngineStraightSix(),
      new InteriorMaterialVinyl()
    )
  ];

  private findSpecificationByName(name: string) {
    return this.specifications.find(
      specification => specification.name === name
    );
  }

  private isValidSpecificationIndex(index: number) {
    return index < 0 || index >= this.specifications.length;
  }

  addSpecification(specification: Specification) {
    if (this.findSpecificationByName(specification.name))
      throw new Error("Specification already exist with this name.");

    this.specifications.push(specification);

    return this;
  }

  removeSpecification(name: string) {
    this.specifications = this.specifications.filter(
      specification => specification.name !== name
    );
  }

  updateSpecification(index: number, updatedSpecification: Specification) {
    if (this.isValidSpecificationIndex(index)) throw new Error("Invalid index");

    this.specifications.splice(index, 1, updatedSpecification);
  }

  getSpecifications() {
    return this.specifications;
  }

  getSpecificationFormByIndex(index: number) {
    if (this.isValidSpecificationIndex(index)) throw new Error("Invalid index");

    const specification = this.specifications[index];

    return {
      name: specification.name,
      engine: specification.engine.name,
      color: specification.exterior.color.name,
      colorType: specification.exterior.color.type,
      interiorMaterial: specification.interiorMaterial.name,
      wheelRims: specification.exterior.wheel.rims,
      wheelModel: specification.exterior.wheel.model
    };
  }
}

export interface Car {
  id: number;
  name: string;
  engine: CarEngine | string;
  color: CarColor | string;
  interiorMaterial?: CarInterior | string;
  wheelRims?: CarRims | string;
  wheelModel?: CarModel | string;
  airSuspension?: boolean;
  signature?: string;
  year?: string;
}

export enum CarColor {
  White = "White",
  Black = "Black",
  Red = "Red",
  Green = "Green"
}
export enum CarInterior {
  Nylon = "Nylon",
  Leather = "Leather",
  Vinyl = "Vinyl",
  Fabric = "Fabric"
}
export enum CarEngine {
  FourCylinder = "The Four Cylinder",
  V6 = "V6",
  V8 = "V8",
  StraightSix = "Straight Six"
}
export enum CarRims {
  SteelRims = "Steel Rims",
  AlloyRims = "Alloy Rims",
  ChromeRims = "Chrome Rims",
  Spinners = "Spinners"
}
export enum CarModel {
  Spoke = "Spoke",
  Tesla = "Tesla",
  Steering = "Steering"
}

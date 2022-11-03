export enum ColorType {
  Solid = "Solid",
  Metallic = "Metallic",
  Pearlescent = "Pearlescent"
}

export class Color {
  constructor(public name: string, public type: ColorType) {}
}

export class ColorWhite extends Color {
  constructor(type: ColorType) {
    super("White", type);
  }
}
export class ColorBlack extends Color {
  constructor(type: ColorType) {
    super("Black", type);
  }
}
export class ColorGreen extends Color {
  constructor(type: ColorType) {
    super("Green", type);
  }
}
export class ColorRed extends Color {
  constructor(type: ColorType) {
    super("Red", type);
  }
}

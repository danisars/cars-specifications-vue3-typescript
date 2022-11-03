export enum WheelRims {
  SteelRims = "Steel Rims",
  AlloyRims = "Alloy Rims",
  ChromeRims = "Chrome Rims",
  Spinners = "Spinners"
}
export enum WheelModel {
  Spoke = "Spoke",
  Tesla = "Tesla",
  Steering = "Steering"
}

export class Wheel {
  constructor(public rims: WheelRims, public model: WheelModel) {}
}

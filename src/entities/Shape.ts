import { Point } from "./Point.js";

export type ShapeType =
  | "triangle"
  | "rectangle"
  | "oval"
  | "cone"
  | "cube"
  | "sphere"
  | "pyramid"
  | "tetrahedron";

export class Shape {
  constructor(
    public id: string,
    public name: string,
    public type: ShapeType,
    public params: Record<string, any>
  ) {}
}

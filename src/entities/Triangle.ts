import { Shape } from "./Shape.js";
import { Point } from "./Point.js";

export class Triangle extends Shape {
  constructor(
    id: string,
    public readonly a: Point,
    public readonly b: Point,
    public readonly c: Point
  ) {
    super(id);
  }

  getArea(): number {
    const { a, b, c } = this;
    return Math.abs(
      (a.x * (b.y - c.y) +
       b.x * (c.y - a.y) +
       c.x * (a.y - b.y)) / 2
    );
  }

  getPerimeter(): number {
    const side = (p1: Point, p2: Point) =>
      Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
    return side(this.a, this.b) + side(this.b, this.c) + side(this.c, this.a);
  }
}

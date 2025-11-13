import { Shape } from "./Shape.js";
import { Point } from "./Point.js";

export class Cone extends Shape {
  constructor(
    id: string,
    public readonly apex: Point,
    public readonly radius: number,
    public readonly height: number
  ) {
    super(id);
  }

  getBaseArea(): number {
    return Math.PI * this.radius ** 2;
  }

  getSurfaceArea(): number {
    const slantHeight = Math.sqrt(this.radius ** 2 + this.height ** 2);
    return Math.PI * this.radius * (this.radius + slantHeight);
  }

  getVolume(): number {
    return (1 / 3) * Math.PI * this.radius ** 2 * this.height;
  }

  getArea(): number {
    return this.getSurfaceArea();
  }
}

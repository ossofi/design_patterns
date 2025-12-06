import { Shape } from "../entities/Shape.js";

export class Specifications {
  static byId(id: string) {
    return (p: Shape) => p.id === id;
  }

  static byName(name: string) {
    return (p: Shape) => p.name === name;
  }

  static inFirstQuadrant() {
    return (p: Shape) => {
      const pts = p.params.points || [];
      return pts.every((pt: any) => pt.x > 0 && pt.y > 0);
    };
  }

  static areaInRange(min: number, max: number, shapeService: any) {
    return (p: Shape) => {
      const a = shapeService.getArea(p);
      return a >= min && a <= max;
    };
  }
}

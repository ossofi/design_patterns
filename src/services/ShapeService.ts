import { Shape } from "../entities/Shape.js";
import { Point } from "../entities/Point.js";
import { EPSILON } from "../constants.js";

export class ShapeService {

  getArea(shape: Shape): number {
    switch (shape.type) {
      case "triangle":
        return this.triangleArea(shape);
      case "rectangle":
        return this.rectangleArea(shape);
      case "oval":
        return this.ovalArea(shape);
      case "cone":
        return this.coneSurfaceArea(shape);
      case "cube":
        return this.cubeSurfaceArea(shape);
      case "sphere":
        return this.sphereSurfaceArea(shape);
      case "pyramid":
        return this.pyramidSurfaceArea(shape);
      case "tetrahedron":
        return this.tetrahedronSurfaceArea(shape);
      default:
        throw new Error(`Unknown shape type ${shape.type}`);
    }
  }

  getPerimeter(shape: Shape): number {
    switch (shape.type) {
      case "triangle":
        return this.trianglePerimeter(shape);
      case "rectangle":
        return this.rectanglePerimeter(shape);
      case "oval":
        return this.ovalPerimeter(shape);
      default:
        return 0;
    }
  }

  getVolume(shape: Shape): number {
    switch (shape.type) {
      case "cone":
        return (1/3) * Math.PI * shape.params.radius ** 2 * shape.params.height;
      case "cube":
        return shape.params.edge ** 3;
      case "sphere":
        return (4/3) * Math.PI * shape.params.radius ** 3;
      case "pyramid":
        return (1/3) * shape.params.baseArea * shape.params.height;
      case "tetrahedron":
        return (shape.params.edge ** 3) / (6 * Math.sqrt(2));
      default:
        return 0;
    }
  }

  private triangleArea(shape: Shape): number {
    const [a, b, c] = shape.params.points;
    return Math.abs(
      (a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y)) / 2
    );
  }

  private trianglePerimeter(shape: Shape): number {
    const [a, b, c] = shape.params.points;
    const dist = (p1: Point, p2: Point) =>
      Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
    return dist(a, b) + dist(b, c) + dist(c, a);
  }

  private rectangleArea(shape: Shape): number {
    return shape.params.width * shape.params.height;
  }

  private rectanglePerimeter(shape: Shape): number {
    return 2 * (shape.params.width + shape.params.height);
  }

  private ovalArea(shape: Shape): number {
    return Math.PI * shape.params.a * shape.params.b;
  }

  private ovalPerimeter(shape: Shape): number {
    const a = shape.params.a;
    const b = shape.params.b;
    return Math.PI * (3*(a+b) - Math.sqrt((3*a+b)*(a+3*b)));
  }

  private coneSurfaceArea(shape: Shape): number {
    const r = shape.params.radius;
    const h = shape.params.height;
    const l = Math.sqrt(r*r + h*h);
    return Math.PI * r * (r + l);
  }

  private cubeSurfaceArea(shape: Shape): number {
    return 6 * shape.params.edge ** 2;
  }

  private sphereSurfaceArea(shape: Shape): number {
    return 4 * Math.PI * shape.params.radius ** 2;
  }

  private pyramidSurfaceArea(shape: Shape): number {
    return shape.params.baseArea + 0.5 * shape.params.perimeter * shape.params.height;
  }

  private tetrahedronSurfaceArea(shape: Shape): number {
    return Math.sqrt(3) * shape.params.edge ** 2;
  }
}

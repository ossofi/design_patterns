import { Shape } from "../entities/Shape.js";

export class ValidationService {
  isValid(shape: Shape): boolean {
    switch(shape.type) {
      case "triangle":
        const pts = shape.params.points;
        return !!pts && pts.length === 3;
      case "rectangle":
        return shape.params.width > 0 && shape.params.height > 0;
      case "oval":
        return shape.params.a > 0 && shape.params.b > 0;
      case "cone":
        return shape.params.radius > 0 && shape.params.height > 0;
      case "cube":
        return shape.params.edge > 0;
      case "sphere":
        return shape.params.radius > 0;
      case "pyramid":
        return shape.params.baseArea > 0 && shape.params.height > 0;
      case "tetrahedron":
        return shape.params.edge > 0;
      default:
        return false;
    }
  }
}

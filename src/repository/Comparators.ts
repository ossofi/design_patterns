import { Shape } from "../entities/Shape.js";

export class Comparators {
  static byId(a: Shape, b: Shape) { return a.id.localeCompare(b.id); }
  static byName(a: Shape, b: Shape) { return a.name.localeCompare(b.name); }
  static byXFirstPoint(a: Shape, b: Shape) {
    const ax = a.params.points?.[0]?.x || 0;
    const bx = b.params.points?.[0]?.x || 0;
    return ax - bx;
  }
  static byYFirstPoint(a: Shape, b: Shape) {
    const ay = a.params.points?.[0]?.y || 0;
    const by = b.params.points?.[0]?.y || 0;
    return ay - by;
  }
}

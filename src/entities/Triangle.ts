import { Shape } from "./Shape.js";
import { Point } from "./Point.js";

// Класс описывает треугольник на плоскости.
// Наследуется от Shape и реализует методы площади и периметра.

export class Triangle extends Shape {
  constructor(
    id: string,
    public readonly a: Point, // первая вершина
    public readonly b: Point, // вторая вершина
    public readonly c: Point  // третья вершина
  ) {
    super(id);
  }

  // Площадь через координаты трёх точек.
  // Используется формула “координатного детерминанта”.

  getArea(): number {
    const { a, b, c } = this;
    return Math.abs(
      (a.x * (b.y - c.y) +
       b.x * (c.y - a.y) +
       c.x * (a.y - b.y)) / 2
    );
  }

  // Периметр треугольника = сумма длин всех сторон.

  getPerimeter(): number {
    const side = (p1: Point, p2: Point) =>
      Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);

    return side(this.a, this.b) + side(this.b, this.c) + side(this.c, this.a);
  }
}

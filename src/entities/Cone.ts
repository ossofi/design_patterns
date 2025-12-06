import { Shape } from "./Shape.js";
import { Point } from "./Point.js";

// Класс описывает конус в 3D-пространстве.
// Наследуется от абстрактной фигуры Shape — значит обязан реализовать getArea().

export class Cone extends Shape {
  constructor(
    id: string,
    public readonly apex: Point,     // координаты вершины конуса
    public readonly radius: number,  // радиус основания
    public readonly height: number   // высота конуса
  ) {
    super(id); // передаём идентификатор в родительский класс Shape
  }

  // Вычисление площади основания конуса (круг) 
  getBaseArea(): number {
    return Math.PI * this.radius ** 2;
  }

  // Полная площадь поверхности конуса:
  //  S = πr(r + l), где l — образующая
  
  getSurfaceArea(): number {
    const slantHeight = Math.sqrt(this.radius ** 2 + this.height ** 2);
    return Math.PI * this.radius * (this.radius + slantHeight);
  }

  // Объём конуса: V = (1/3)πr²h 
  getVolume(): number {
    return (1 / 3) * Math.PI * this.radius ** 2 * this.height;
  }

  // Для совместимости с Shape: считаем, что “area” = площадь поверхности 
  getArea(): number {
    return this.getSurfaceArea();
  }
}

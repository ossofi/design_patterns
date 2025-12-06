import { Observer } from "../observer/Observer.js";
import { Shape } from "../entities/Shape.js";
import { ShapeService } from "../services/ShapeService.js";

export class Warehouse implements Observer {
  private static instance: Warehouse;
  private metrics = new Map<string, {area: number, perimeter: number, volume: number}>();
  private shapeService = new ShapeService();

  private constructor() {}

  static getInstance(): Warehouse {
    if (!Warehouse.instance) Warehouse.instance = new Warehouse();
    return Warehouse.instance;
  }

  update(subject: any, shape: Shape | null) {
    if (shape) {
      this.metrics.set(shape.id, {
        area: this.shapeService.getArea(shape),
        perimeter: this.shapeService.getPerimeter(shape),
        volume: this.shapeService.getVolume(shape)
      });
    }
  }

  getMetrics(id: string) {
    return this.metrics.get(id);
  }
}

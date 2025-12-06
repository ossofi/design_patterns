import { Shape } from "../entities/Shape.js";
import { Subject } from "../observer/Subject.js";

export class Repository extends Subject {
  private items: Shape[] = [];

  add(shape: Shape) {
    this.items.push(shape);
    this.notify(shape);
  }

  remove(id: string) {
    this.items = this.items.filter(s => s.id !== id);
    this.notify(null);
  }

  update(id: string, newShape: Partial<Shape>) {
    const index = this.items.findIndex(s => s.id === id);
    if (index >= 0) {
      this.items[index] = {...this.items[index], ...newShape};
      this.notify(this.items[index]);
    }
  }

  getAll(): Shape[] {
    return [...this.items];
  }
}

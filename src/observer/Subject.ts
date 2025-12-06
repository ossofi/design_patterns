import { Observer } from "./Observer.js";

export class Subject {
  private observers: Observer[] = [];

  attach(observer: Observer) { this.observers.push(observer); }
  detach(observer: Observer) {
    this.observers = this.observers.filter(o => o !== observer);
  }
  notify(data: any) {
    this.observers.forEach(o => o.update(this, data));
  }
}

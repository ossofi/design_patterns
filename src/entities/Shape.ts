// Абстрактный класс для всех геометрических фигур.
// Любая фигура обязана реализовать метод getArea().

export abstract class Shape {
    constructor(public readonly id: string) {}
  
    // Абстрактный метод — должен быть реализован в наследниках
    abstract getArea(): number;
  }
  
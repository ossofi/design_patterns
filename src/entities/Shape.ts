export abstract class Shape {
    constructor(public readonly id: string) {}
  
    abstract getArea(): number;
  }
  
// Точка в 2D или 3D пространстве.
// Если z не передан — по умолчанию создаётся точка в 2D (z = 0).

export class Point {
    constructor(
      public readonly x: number,
      public readonly y: number,
      public readonly z: number = 0
    ) {}
  }
  
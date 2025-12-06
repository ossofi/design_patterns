import { Triangle } from "../entities/Triangle.js";
import { Point } from "../entities/Point.js";
import pino from "pino";
import { EPSILON } from "../constants.js";

// Логгер pino для информации о проверках
const logger = pino({
  transport: {
    target: "pino-pretty",
    options: { colorize: true }
  }
});

export class TriangleService {

  // Проверяет, что площадь > 0
  isValid(triangle: Triangle): boolean {
    const valid = triangle.getArea() > 0;
    logger.info(`Triangle ${triangle.id} is valid: ${valid}`);
    return valid;
  }

  // Проверяет, является ли треугольник прямоугольным
  isRight(triangle: Triangle): boolean {
    // Сортируем стороны по возрастанию (c — гипотенуза)
    const [a, b, c] = this.getSides(triangle).sort((x, y) => x - y);

    // Проверяем теорему Пифагора с учетом EPSILON
    const right = Math.abs(a ** 2 + b ** 2 - c ** 2) < EPSILON;
    logger.info(`Triangle ${triangle.id} is right: ${right}`);
    return right;
  }

  // Проверяет равносторонний ли треугольник
  isEquilateral(triangle: Triangle): boolean {
    const sides = this.getSides(triangle);
    const equilateral = sides.every(s => Math.abs(s - sides[0]) < EPSILON);
    logger.info(`Triangle ${triangle.id} is equilateral: ${equilateral}`);
    return equilateral;
  }

  // Проверяет равнобедренный ли треугольник
  isIsosceles(triangle: Triangle): boolean {
    const [a, b, c] = this.getSides(triangle);
    const isosceles =
      Math.abs(a - b) < EPSILON ||
      Math.abs(b - c) < EPSILON ||
      Math.abs(a - c) < EPSILON;

    logger.info(`Triangle ${triangle.id} is isosceles: ${isosceles}`);
    return isosceles;
  }

  // Возвращает длины сторон по двум точкам
  getSides(triangle: Triangle): number[] {
    const side = (p1: Point, p2: Point) =>
      Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);

    return [
      side(triangle.a, triangle.b),
      side(triangle.b, triangle.c),
      side(triangle.c, triangle.a)
    ];
  }
}

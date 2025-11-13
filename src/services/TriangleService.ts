import { Triangle } from "../entities/Triangle.js";
import { Point } from "../entities/Point.js";
import pino from "pino";
import { EPSILON } from "../constants.js";

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: { colorize: true }
  }
});

export class TriangleService {
  isValid(triangle: Triangle): boolean {
    const valid = triangle.getArea() > 0;
    logger.info(`Triangle ${triangle.id} is valid: ${valid}`);
    return valid;
  }

  isRight(triangle: Triangle): boolean {
    const [a, b, c] = this.getSides(triangle).sort((x, y) => x - y);
    const right = Math.abs(a ** 2 + b ** 2 - c ** 2) < EPSILON;
    logger.info(`Triangle ${triangle.id} is right: ${right}`);
    return right;
  }

  isEquilateral(triangle: Triangle): boolean {
    const sides = this.getSides(triangle);
    const equilateral = sides.every((s) => Math.abs(s - sides[0]) < EPSILON);
    logger.info(`Triangle ${triangle.id} is equilateral: ${equilateral}`);
    return equilateral;
  }

  isIsosceles(triangle: Triangle): boolean {
    const [a, b, c] = this.getSides(triangle);
    const isosceles = Math.abs(a - b) < EPSILON || Math.abs(b - c) < EPSILON || Math.abs(a - c) < EPSILON;
    logger.info(`Triangle ${triangle.id} is isosceles: ${isosceles}`);
    return isosceles;
  }

  getSides(triangle: Triangle): number[] {
    const side = (p1: Point, p2: Point) =>
      Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
    return [side(triangle.a, triangle.b), side(triangle.b, triangle.c), side(triangle.c, triangle.a)];
  }
}

import { Point } from "../entities/Point.js";
import { Triangle } from "../entities/Triangle.js";
import { TriangleService } from "../services/TriangleService.js";

describe("TriangleService", () => {
  const triangleService = new TriangleService();

  // Прямоугольный треугольник со сторонами 3, 4, 5
  const triangle = new Triangle("T1", new Point(0, 0), new Point(3, 0), new Point(0, 4));

  // Проверка площади и периметра
  test("area and perimeter", () => {
    expect(triangle.getArea()).toBeCloseTo(6);
    expect(triangle.getPerimeter()).toBeCloseTo(12);
  });

  // Проверка валидности и прямоугольности
  test("is valid and right", () => {
    expect(triangleService.isValid(triangle)).toBe(true);
    expect(triangleService.isRight(triangle)).toBe(true);
  });

  // Проверка равнобедренного и неравностороннего треугольника
  test("is equilateral / isosceles", () => {
    const iso = new Triangle("T2", new Point(0, 0), new Point(2, 0), new Point(1, 1));
    expect(triangleService.isIsosceles(iso)).toBe(true);
    expect(triangleService.isEquilateral(iso)).toBe(false);
  });
});

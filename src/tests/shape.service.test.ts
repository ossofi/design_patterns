import { ShapeService } from "../services/ShapeService";
import { Shape } from "../entities/Shape";
import { Point } from "../entities/Point";

describe("ShapeService", () => {
  const service = new ShapeService();

  test("triangle area and perimeter", () => {
    const triangle = new Shape("T1", "Triangle1", "triangle", {
      points: [new Point(0,0), new Point(3,0), new Point(0,4)]
    });
    expect(service.getArea(triangle)).toBeCloseTo(6);
    expect(service.getPerimeter(triangle)).toBeCloseTo(12);
  });

  test("cone area and volume", () => {
    const cone = new Shape("C1", "Cone1", "cone", {
      apex: new Point(0,0,0),
      radius: 3,
      height: 5
    });
    expect(service.getArea(cone)).toBeCloseTo(Math.PI*3*(3+Math.sqrt(34)));
    expect(service.getVolume(cone)).toBeCloseTo((1/3)*Math.PI*9*5);
  });
});

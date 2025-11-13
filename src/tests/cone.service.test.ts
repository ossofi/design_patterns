import { Cone } from "../entities/Cone.js";
import { Point } from "../entities/Point.js";
import { ConeService } from "../services/ConeService.js";

describe("ConeService", () => {
  const coneService = new ConeService();
  const cone = new Cone("C1", new Point(0, 0, 0), 3, 5);

  test("surface area and volume", () => {
    expect(cone.getBaseArea()).toBeCloseTo(Math.PI * 9);
    expect(cone.getSurfaceArea()).toBeCloseTo(Math.PI * 3 * (3 + Math.sqrt(34)));
    expect(cone.getVolume()).toBeCloseTo((1 / 3) * Math.PI * 9 * 5);
  });

  test("validation and plane base detection", () => {
    expect(coneService.isValid(cone)).toBe(true);
    const badCone = new Cone("C2", new Point(0, 0, 0), -2, 4);
    expect(coneService.isValid(badCone)).toBe(false);

    const coneOnPlane = new Cone("C3", new Point(0, 0, 0), 2, 3);
    expect(coneService.baseOnCoordinatePlane(coneOnPlane)).toBe(true);
  });

  test("volume ratio after cut", () => {
    expect(coneService.volumeRatioAfterCut(cone, 2.5)).toBeCloseTo((2.5 / 5) ** 3);
  });
});

import { Repository } from "../repository/Repository";
import { Warehouse } from "../warehouse/Warehouse";
import { Shape } from "../entities/Shape";
import { Point } from "../entities/Point";

describe("Warehouse", () => {
  test("metrics update on add", () => {
    const repo = new Repository();
    const warehouse = Warehouse.getInstance();
    repo.attach(warehouse);

    const triangle = new Shape("T1", "Triangle1", "triangle", {
      points: [new Point(0,0), new Point(3,0), new Point(0,4)]
    });
    repo.add(triangle);
    const metrics = warehouse.getMetrics("T1");
    expect(metrics?.area).toBeCloseTo(6);
    expect(metrics?.perimeter).toBeCloseTo(12);
  });
});

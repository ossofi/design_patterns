import { Repository } from "../repository/Repository";
import { Shape } from "../entities/Shape";
import { Point } from "../entities/Point";

describe("Repository", () => {
  let repo: Repository;

  beforeEach(() => { repo = new Repository(); });

  test("add and remove", () => {
    const s = new Shape("S1", "Shape1", "triangle", {points: [new Point(0,0), new Point(1,0), new Point(0,1)]});
    repo.add(s);
    expect(repo.getAll().length).toBe(1);
    repo.remove("S1");
    expect(repo.getAll().length).toBe(0);
  });

  test("update shape", () => {
    const s = new Shape("S1", "Shape1", "triangle", {points: [new Point(0,0), new Point(1,0), new Point(0,1)]});
    repo.add(s);
    repo.update("S1", {name: "NewName"});
    expect(repo.getAll()[0].name).toBe("NewName");
  });
});

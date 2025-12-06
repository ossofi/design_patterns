import { FileReaderService } from "../services/FileReaderService";

describe("FileReaderService", () => {
  const fileReaderService = new FileReaderService();

  test("reads shapes correctly", () => {
    const shapes = fileReaderService.readShapes("./src/data/shapes.txt");
    expect(shapes.length).toBeGreaterThan(0);

    const types = shapes.map(s => s.type);
    expect(types).toContain("triangle");
    expect(types).toContain("cone");

    shapes.forEach(s => {
      expect(s.id).toBeDefined();
      expect(s.name).toBeDefined();
    });
  });
});

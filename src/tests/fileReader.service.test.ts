import { FileReaderService } from "../services/FileReaderService.js";

describe("FileReaderService", () => {
  const fileReaderService = new FileReaderService();

  // Проверяем чтение треугольников из файла
  test("reads triangles correctly", () => {
    const triangles = fileReaderService.readTriangles("./src/data/triangles.txt");
    expect(triangles.length).toBeGreaterThan(0);
    expect(triangles[0].getArea()).toBeGreaterThan(0);
  });

  // Проверяем чтение конусов из файла
  test("reads cones correctly", () => {
    const cones = fileReaderService.readCones("./src/data/cones.txt");
    expect(cones.length).toBeGreaterThan(0);
    expect(cones[0].radius).toBeGreaterThan(0);
    expect(cones[0].getVolume()).toBeGreaterThan(0);
  });
});

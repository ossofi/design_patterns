import path from "path";
import { FileReaderService } from "./services/FileReaderService.js";
import { TriangleService } from "./services/TriangleService.js";
import { ConeService } from "./services/ConeService.js";

const fileReaderService = new FileReaderService();
const triangleService = new TriangleService();
const coneService = new ConeService();

const trianglesPath = path.resolve("./src/data/triangles.txt");
const conesPath = path.resolve("./src/data/cones.txt");

const triangles = fileReaderService.readTriangles(trianglesPath);
const cones = fileReaderService.readCones(conesPath);

console.log("Triangles");
triangles.forEach(t => {
  console.log(
    `${t.id}: area=${t.getArea()}, perimeter=${t.getPerimeter()}, right=${triangleService.isRight(t)}`
  );
});

console.log("Cones");
cones.forEach(c => {
  console.log(
    `${c.id}: base area=${c.getBaseArea()}, surface area=${c.getSurfaceArea()}, volume=${c.getVolume()}, on plane=${coneService.baseOnCoordinatePlane(c)}`
  );
});

import { Repository } from "./repository/Repository.js";
import { Warehouse } from "./warehouse/Warehouse.js";
import { ShapeService } from "./services/ShapeService.js";
import { FileReaderService } from "./services/FileReaderService.js";

const repo = new Repository();
const warehouse = Warehouse.getInstance();
repo.attach(warehouse);

const shapeService = new ShapeService();

const fileReader = new FileReaderService();
const shapes = fileReader.readShapes("./src/data/shapes.txt");

shapes.forEach(shape => repo.add(shape));

shapes.forEach(shape => {
  const metrics = warehouse.getMetrics(shape.id);
  console.log(`Metrics for ${shape.name} (${shape.type}):`);
  console.log(metrics);

  console.log("Verified calculations via ShapeService:");
  if (shapeService.getArea(shape) !== undefined) {
    console.log(`  Area: ${shapeService.getArea(shape)}`);
  }
  if (shapeService.getPerimeter(shape) !== undefined) {
    console.log(`  Perimeter: ${shapeService.getPerimeter(shape)}`);
  }
  if (shapeService.getVolume(shape) !== undefined) {
    console.log(`  Volume: ${shapeService.getVolume(shape)}`);
  }
  console.log("---------------------------");
});

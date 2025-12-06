import path from "path";
import { FileReaderService } from "./services/FileReaderService.js";
import { TriangleService } from "./services/TriangleService.js";
import { ConeService } from "./services/ConeService.js";

// Создаём экземпляры сервисов
const fileReaderService = new FileReaderService();
const triangleService = new TriangleService();
const coneService = new ConeService();

// Формируем абсолютные пути к файлам данных
const trianglesPath = path.resolve("./src/data/triangles.txt");
const conesPath = path.resolve("./src/data/cones.txt");

// Читаем и валидируем треугольники и конусы из файлов
const triangles = fileReaderService.readTriangles(trianglesPath);
const cones = fileReaderService.readCones(conesPath);

// Вывод информации о треугольниках
console.log("Triangles");
triangles.forEach(t => {
  console.log(
    `${t.id}: area=${t.getArea()}, perimeter=${t.getPerimeter()}, right=${triangleService.isRight(t)}`
  );
});

// Вывод информации о конусах
console.log("Cones");
cones.forEach(c => {
  console.log(
    `${c.id}: base area=${c.getBaseArea()}, surface area=${c.getSurfaceArea()}, volume=${c.getVolume()}, on plane=${coneService.baseOnCoordinatePlane(c)}`
  );
});

import fs from "fs";
import { Point } from "../entities/Point.js";
import { Triangle } from "../entities/Triangle.js";
import { Cone } from "../entities/Cone.js";
import pino from "pino";
import { SPACE_REGEX } from "../constants.js";

// Логгер для вывода ошибок и информации
const logger = pino({
  transport: {
    target: "pino-pretty",
    options: { colorize: true }
  }
});

// Кастомное исключение для ошибок чтения файлов
export class FileReadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FileReadError";
  }
}

export class FileReaderService {

  // Чтение и разбор файла с треугольниками
  readTriangles(path: string): Triangle[] {
    try {
      // Получаем строки файла
      const lines = fs.readFileSync(path, "utf-8").split("\n");
      const triangles: Triangle[] = [];

      lines.forEach((line, index) => {
        // Разбиваем строку по пробелам и конвертируем в числа
        const parts = line.trim().split(SPACE_REGEX).map(Number);

        // Проверка на корректность количества данных
        if (parts.length < 6 || parts.some(isNaN)) {
          logger.warn(`Skipping invalid triangle line ${index + 1}: "${line}"`);
          return;
        }

        // Координаты трёх точек
        const [x1, y1, x2, y2, x3, y3] = parts;

        // Проверяем нулевую площадь (вырожденный треугольник)
        const area = Math.abs(
          (x1 * (y2 - y3) +
           x2 * (y3 - y1) +
           x3 * (y1 - y2)) / 2
        );

        if (area === 0) {
          logger.warn(`Skipping zero-area triangle line ${index + 1}`);
          return;
        }

        // Создаём объект треугольника
        triangles.push(
          new Triangle(
            `T${index + 1}`,
            new Point(x1, y1),
            new Point(x2, y2),
            new Point(x3, y3)
          )
        );
      });

      logger.info(`Read ${triangles.length} valid triangles from ${path}`);
      return triangles;

    } catch {
      throw new FileReadError(`Cannot read triangles from ${path}`);
    }
  }

  // Чтение и разбор файла с конусами
  readCones(path: string): Cone[] {
    try {
      const lines = fs.readFileSync(path, "utf-8").split("\n");
      const cones: Cone[] = [];

      lines.forEach((line, index) => {
        const parts = line.trim().split(SPACE_REGEX).map(Number);

        // Проверяем количество аргументов
        if (parts.length < 5 || parts.some(isNaN)) {
          logger.warn(`Skipping invalid cone line ${index + 1}: "${line}"`);
          return;
        }

        const [x, y, z, r, h] = parts;

        // Проверяем радиус и высоту
        if (r <= 0 || h <= 0) {
          logger.warn(`Skipping cone with invalid dimensions line ${index + 1}`);
          return;
        }

        // Создаём объект конуса
        cones.push(new Cone(`C${index + 1}`, new Point(x, y, z), r, h));
      });

      logger.info(`Read ${cones.length} valid cones from ${path}`);
      return cones;

    } catch {
      throw new FileReadError(`Cannot read cones from ${path}`);
    }
  }
}

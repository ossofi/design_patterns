import fs from "fs";
import { Point } from "../entities/Point.js";
import { Triangle } from "../entities/Triangle.js";
import { Cone } from "../entities/Cone.js";
import pino from "pino";
import { SPACE_REGEX } from "../constants.js";

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: { colorize: true }
  }
});

export class FileReadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FileReadError";
  }
}

export class FileReaderService {
  readTriangles(path: string): Triangle[] {
    try {
      const lines = fs.readFileSync(path, "utf-8").split("\n");
      const triangles: Triangle[] = [];
      lines.forEach((line, index) => {
        const parts = line.trim().split(SPACE_REGEX).map(Number);
        if (parts.length < 6 || parts.some(isNaN)) {
          logger.warn(`Skipping invalid triangle line ${index + 1}: "${line}"`);
          return;
        }
        const [x1, y1, x2, y2, x3, y3] = parts;
        const area = Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2);
        if (area === 0) {
          logger.warn(`Skipping zero-area triangle line ${index + 1}`);
          return;
        }
        triangles.push(new Triangle(`T${index + 1}`, new Point(x1, y1), new Point(x2, y2), new Point(x3, y3)));
      });
      logger.info(`Read ${triangles.length} valid triangles from ${path}`);
      return triangles;
    } catch {
      throw new FileReadError(`Cannot read triangles from ${path}`);
    }
  }

  readCones(path: string): Cone[] {
    try {
      const lines = fs.readFileSync(path, "utf-8").split("\n");
      const cones: Cone[] = [];
      lines.forEach((line, index) => {
        const parts = line.trim().split(SPACE_REGEX).map(Number);
        if (parts.length < 5 || parts.some(isNaN)) {
          logger.warn(`Skipping invalid cone line ${index + 1}: "${line}"`);
          return;
        }
        const [x, y, z, r, h] = parts;
        if (r <= 0 || h <= 0) {
          logger.warn(`Skipping cone with invalid dimensions line ${index + 1}`);
          return;
        }
        cones.push(new Cone(`C${index + 1}`, new Point(x, y, z), r, h));
      });
      logger.info(`Read ${cones.length} valid cones from ${path}`);
      return cones;
    } catch {
      throw new FileReadError(`Cannot read cones from ${path}`);
    }
  }
}

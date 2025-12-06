import fs from "fs";
import pino from "pino";
import { Shape } from "../entities/Shape.js";
import { Point } from "../entities/Point.js";
import { SPACE_REGEX } from "../constants.js";

const logger = pino({
  transport: { target: "pino-pretty", options: { colorize: true } }
});

export class FileReaderService {
  private shapeFactories: Record<string, (parts: string[], index: number) => Shape> = {
    triangle: (parts, index) => {
      if (parts.length < 7) throw new Error("Not enough data for triangle");
      const points = [
        new Point(Number(parts[1]), Number(parts[2])),
        new Point(Number(parts[3]), Number(parts[4])),
        new Point(Number(parts[5]), Number(parts[6]))
      ];
      return new Shape(`T${index + 1}`, `Triangle${index + 1}`, "triangle", { points });
    },
    rectangle: (parts, index) => {
      if (parts.length < 5) throw new Error("Not enough data for rectangle");
      const points = [
        new Point(Number(parts[1]), Number(parts[2])),
        new Point(Number(parts[3]), Number(parts[4]))
      ];
      return new Shape(`R${index + 1}`, `Rectangle${index + 1}`, "rectangle", { points });
    },
    oval: (parts, index) => {
      if (parts.length < 5) throw new Error("Not enough data for oval");
      const a = Number(parts[3]);
      const b = Number(parts[4]);
      return new Shape(`O${index + 1}`, `Oval${index + 1}`, "oval", { center: new Point(Number(parts[1]), Number(parts[2])), a, b });
    },
    cone: (parts, index) => {
      if (parts.length < 6) throw new Error("Not enough data for cone");
      const apex = new Point(Number(parts[1]), Number(parts[2]), Number(parts[3]));
      const radius = Number(parts[4]);
      const height = Number(parts[5]);
      return new Shape(`C${index + 1}`, `Cone${index + 1}`, "cone", { apex, radius, height });
    },
    cube: (parts, index) => {
      if (parts.length < 5) throw new Error("Not enough data for cube");
      const origin = new Point(Number(parts[1]), Number(parts[2]), Number(parts[3]));
      const side = Number(parts[4]);
      return new Shape(`CU${index + 1}`, `Cube${index + 1}`, "cube", { origin, side });
    },
    sphere: (parts, index) => {
      if (parts.length < 5) throw new Error("Not enough data for sphere");
      const center = new Point(Number(parts[1]), Number(parts[2]), Number(parts[3]));
      const radius = Number(parts[4]);
      return new Shape(`S${index + 1}`, `Sphere${index + 1}`, "sphere", { center, radius });
    },
    pyramid: (parts, index) => {
      if (parts.length < 5) throw new Error("Not enough data for pyramid");
      const baseArea = Number(parts[4]);
      const height = Number(parts[5]);
      return new Shape(`P${index + 1}`, `Pyramid${index + 1}`, "pyramid", { baseOrigin: new Point(Number(parts[1]), Number(parts[2]), Number(parts[3])), baseArea, height });
    },
    tetrahedron: (parts, index) => {
      if (parts.length < 5) throw new Error("Not enough data for tetrahedron");
      const origin = new Point(Number(parts[1]), Number(parts[2]), Number(parts[3]));
      const edge = Number(parts[4]);
      return new Shape(`TET${index + 1}`, `Tetrahedron${index + 1}`, "tetrahedron", { origin, edge });
    }
  };

  readShapes(path: string): Shape[] {
    if (!fs.existsSync(path)) {
      logger.error(`File not found: ${path}`);
      return [];
    }

    const lines = fs.readFileSync(path, "utf-8").trim().split("\n");
    const shapes: Shape[] = [];

    lines.forEach((line, index) => {
      if (!line.trim()) return;
      const parts = line.trim().split(SPACE_REGEX);
      const type = parts[0].toLowerCase();

      try {
        const factory = this.shapeFactories[type];
        if (!factory) {
          logger.warn(`Unknown shape type at line ${index + 1}: ${type}`);
          return;
        }
        const shape = factory(parts, index);
        shapes.push(shape);
      } catch (err: any) {
        logger.warn(`Invalid shape data at line ${index + 1}: ${err.message}`);
      }
    });

    return shapes;
  }
}

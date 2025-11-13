import { Cone } from "../entities/Cone.js";
import pino from "pino";
import { EPSILON } from "../constants.js";

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: { colorize: true }
  }
});

export class ConeService {
  isValid(cone: Cone): boolean {
    const valid = cone.radius > 0 && cone.height > 0;
    logger.info(`Cone ${cone.id} is valid: ${valid}`);
    return valid;
  }

  baseOnCoordinatePlane(cone: Cone): boolean {
    const onPlane = Math.abs(cone.apex.z) < EPSILON || Math.abs(cone.apex.z - cone.height) < EPSILON;
    logger.info(`Cone ${cone.id} base on plane: ${onPlane}`);
    return onPlane;
  }

  volumeRatioAfterCut(cone: Cone, zCut: number): number {
    if (zCut <= 0 || zCut >= cone.height) {
      logger.warn(`Cone ${cone.id} invalid cut height: ${zCut}`);
      return 0;
    }
    const ratio = (zCut / cone.height) ** 3;
    logger.info(`Cone ${cone.id} volume ratio after cut at ${zCut}: ${ratio}`);
    return ratio;
  }
}

import { Cone } from "../entities/Cone.js";
import pino from "pino";
import { EPSILON } from "../constants.js";

// Логгер для вывода информации в красивом формате
const logger = pino({
  transport: {
    target: "pino-pretty",
    options: { colorize: true }
  }
});

export class ConeService {

  // Проверяет, что у конуса корректные размеры
  isValid(cone: Cone): boolean {
    const valid = cone.radius > 0 && cone.height > 0;
    logger.info(`Cone ${cone.id} is valid: ${valid}`);
    return valid;
  }

  // Проверяет, лежит ли основание конуса на координатной плоскости
  baseOnCoordinatePlane(cone: Cone): boolean {
    // Основание лежит на плоскости, если z = 0 или apex.z = height (верх на высоте)
    const onPlane =
      Math.abs(cone.apex.z) < EPSILON ||
      Math.abs(cone.apex.z - cone.height) < EPSILON;

    logger.info(`Cone ${cone.id} base on plane: ${onPlane}`);
    return onPlane;
  }

  // Вычисляет отношение объёма малой части после среза
  volumeRatioAfterCut(cone: Cone, zCut: number): number {
    // Проверяем корректность высоты среза
    if (zCut <= 0 || zCut >= cone.height) {
      logger.warn(`Cone ${cone.id} invalid cut height: ${zCut}`);
      return 0;
    }

    // Формула: (h_cut / H)^3
    const ratio = (zCut / cone.height) ** 3;
    logger.info(`Cone ${cone.id} volume ratio after cut at ${zCut}: ${ratio}`);
    return ratio;
  }
}

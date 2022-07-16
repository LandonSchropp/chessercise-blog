import { Vector } from "../types";

/**
 * Converts radians to degrees.
 */
export function radiansToDegrees(radians: number) {
  return radians * 180 / Math.PI;
}

/**
 * Returns the distance between two vectors.
 */
export function distance(from: Vector, to: Vector) {
  return Math.sqrt((from[0] - to[0]) ** 2 + (from[1] - to[1]) ** 2);
}

/**
 * Adds a constant to each value in the vector.
 */
export function addConstant(vector: Vector, constant: number): Vector {
  return [ vector[0] + constant, vector[1] + constant ];
}

/**
 * Returns the modulo of the number, correctly handling negative numbers.
 */
export function mod(dividend: number, divisor: number) {
  return (dividend % divisor + divisor) % divisor;
}

/**
 * Shortens the segment between two vectors by the provided length.
 * @param from The starting point of the segment.
 * @param to The ending point of the segment.
 * @param amount The amount to shorten the segment.
 * @return Returns the coordinates of the new to.
 */
export function lengthenSegment(from: Vector, to: Vector, amount: number): Vector {
  const lineLength = distance(from, to);
  const t = (lineLength + amount) / lineLength;

  return [
    from[0] + (to[0] - from[0]) * t,
    from[1] + (to[1] - from[1]) * t
  ];
}

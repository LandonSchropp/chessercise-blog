import { Player, Square, Vector } from "../../types";
import { orientIndices, squareToIndices } from "../../utilities/squares";
import { SQUARE_SIZE } from "./constants";

export function squareToSVGCoordinates(
  square: Square,
  orientation: Player,
  numberOfRanks: number
): Vector {
  const [ fileIndex, rankIndex ] = orientIndices(squareToIndices(square), orientation);
  return [ fileIndex * SQUARE_SIZE, (numberOfRanks - rankIndex - 1) * SQUARE_SIZE ] as Vector;
}

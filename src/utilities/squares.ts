import _ from "lodash";

import { BOARD_SIZE, DARK_SQUARE, FILES, LIGHT_SQUARE, PLAYERS, RANKS, WHITE } from "../constants";
import { Coordinates, Player } from "../types";

function validateIndices(indices: Coordinates) {
  if (!_.isArray(indices)) {
    throw new Error("The indices must be an array.");
  }

  const [ fileIndex, rankIndex ] = indices;

  if (!_.isNumber(fileIndex) || !_.isNumber(rankIndex)) {
    throw new Error("The board indices must be numbers.");
  }

  if (fileIndex < 0 || fileIndex >= BOARD_SIZE || rankIndex < 0 || rankIndex >= BOARD_SIZE) {
    throw new Error(`The board indices [ ${ fileIndex }, ${ rankIndex } ] are out of bounds.`);
  }
}

/**
 * Converts the rank and file coordinates of a chess square to board indices.
 * @param square A string representing the square's coordinates.
 * @return Returns an array of coordinates between 0–7 inclusive.
 */
export function squareToIndices(square: string): Coordinates {

  if (!_.isString(square)) {
    throw new Error("The square must be a string.");
  }

  const [ file, rank ] = square;
  const result: Coordinates = [ FILES.indexOf(file), RANKS.indexOf(rank) ];

  if (result.includes(-1)) {
    throw new Error(`The square ${ square } is not valid.`);
  }

  return result;
}

export function indicesToSquare(indices: Coordinates) {
  validateIndices(indices);
  const [ fileIndex, rankIndex ] = indices;
  return `${ FILES[fileIndex] }${ RANKS[rankIndex] }`;
}

/**
 * Reverses the coordinate system for a single board index.
 */
function reverseIndex(index: number) {
  return BOARD_SIZE - 1 - index;
}

/**
 * Since SVGs are drawn from the top-left and chessboards' coordinates are from the bottom left, we
 * have to reverse the y-coordinate.
 */
export function reverseYIndex(indices: Coordinates): Coordinates {
  validateIndices(indices);
  const [ fileIndex, rankIndex ] = indices;
  return [ fileIndex, reverseIndex(rankIndex) ];
}

/**
 * If the orientation is from black's perspective, we have to flip the indices.
 */
export function orientIndices(indices: Coordinates, orientation: Player): Coordinates {
  validateIndices(indices);
  const [ fileIndex, rankIndex ] = indices;

  if (!PLAYERS.includes(orientation)) {
    throw new Error(`The orientation ${ orientation } is not valid.`);
  }

  return orientation === WHITE
    ? [ fileIndex, rankIndex ]
    : [ reverseIndex(fileIndex), reverseIndex(rankIndex) ];
}

/**
 * Returns true if the move was a knight move.
 * @from A string representing the from square.
 * @to A string representing the to Square.
 */
export function isKnightMove(from: string, to: string) {
  const fromIndices = squareToIndices(from);
  const toIndices = squareToIndices(to);

  const xDifference = Math.abs(fromIndices[0] - toIndices[0]);
  const yDifference = Math.abs(fromIndices[1] - toIndices[1]);

  return xDifference === 1 && yDifference === 2 || xDifference === 2 && yDifference === 1;
}

/**
 * Returns the color of the given square (light or dark).
 */
export function squareColor(square: string) {
  return _.sum(squareToIndices(square)) % 2 === 0 ? DARK_SQUARE : LIGHT_SQUARE;
}

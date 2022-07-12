import _ from "lodash";

import { FEN_PIECES } from "../constants";
import { NullablePlayerPiece, PlayerPiece, Vector } from "../types";

const FEN_POSITION_REGEX = /^[pnbrqk\d]+(\/[pnbrqk\d]+)*$/i;

/**
 * Splits the fen into an array of parts.
 */
function splitFEN(fen: string) {
  return fen.trim().split(/\s+/);
}

/**
 * Returns the position component of a FEN.
 */
function fenPosition(fen: string) {
  return splitFEN(fen)[0];
}

function parsePositionRow(fenRow: string): NullablePlayerPiece[] {
  return Array.from(fenRow).reduce((accumulator, character) => {
    const pieces = /\d/.test(character)
      ? new Array(parseInt(character, 10)).fill(null)
      // eslint-disable-next-line no-extra-parens
      : [ (FEN_PIECES as Record<string, PlayerPiece>)[character] || null ];
    return [ ...accumulator, ...pieces ];
  }, [] as NullablePlayerPiece[]);
}

function validatePosition(position: string) {
  if (!FEN_POSITION_REGEX.test(position)) {
    throw new Error(`The FEN position '${ position }' is not valid.`);
  }
}

/**
 * Returns a vector contains the number of ranks and the number of files (in that order).
 */
export function parsedPositionSize(parsedPosition: NullablePlayerPiece[][]): Vector {
  const numberOfRanks = parsedPosition.length;
  const numberOfFiles = Math.max(..._.map(parsedPosition, "length"));
  return [ numberOfRanks, numberOfFiles ];
}

/**
 * Parses a FEN into a 2D array of pieces. The first index is the rank, and the second is the file.
 */
export function parsePosition(fen: string): NullablePlayerPiece[][] {
  const position = fenPosition(fen);

  validatePosition(position);

  const parsedPosition = position
    .split("/")
    .map(parsePositionRow);

  const [ , numberOfFiles ] = parsedPositionSize(parsedPosition);

  return parsedPosition.map(row => {
    return [ ...row, ...new Array(numberOfFiles - row.length).fill(null) ];
  });
}

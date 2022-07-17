import { Chess, validateFen as validateFenChessJS } from "chess.js/src/chess";
import _ from "lodash";

import {
  BLACK,
  BOARD_SIZE,
  EMPTY_POSITION,
  FEN_PIECES,
  KINGSIDE,
  PLAYERS,
  QUEENSIDE,
  SIDES,
  WHITE
} from "../constants";
import { NullablePlayerPiece, Player, PlayerPiece, Side, Vector } from "../types";

const FEN_POSITION_REGEX = /^[pnbrqk\d]+(\/[pnbrqk\d]+)*$/i;

function splitFEN(fen: string) {
  return fen.trim().split(/\s+/);
}

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

/**
 * Determines how many spaces have been occupied in a line of a FEN placement.
 */
function placementLineLength(line: string) {
  const splitLine = line.split("");
  return _.sumBy(splitLine, character => /\d/.test(character) ? parseInt(character, 10) : 1);
}

/**
 * Ensures the FEN line adds up to 8.
 */
function sanitizeLine(line: string) {

  // Remove any numbers at the end of the line
  line = line.replace(/\d+$/, "");

  // Add the line length to the end of the line if necessary.
  const lineLength = placementLineLength(line);

  return lineLength >= BOARD_SIZE
    ? line
    : `${ line }${ BOARD_SIZE - lineLength }`;
}

/**
 * Sanitizes the placement portion of the FEN.
 */
function sanitizePosition(position: string) {

  return _.flow(

    // Split out the lines.
    (value) => value.split("/"),

    // Make sure there are at least 8 lines.
    (value) => [ ...value, ..._.times(BOARD_SIZE - value.length, () => "") ],

    // Remove extra lines.
    (value) => value.slice(0, BOARD_SIZE),

    // Sanitize each line.
    value => value.map(sanitizeLine),

    // Put the lines back together.
    value => value.join("/")
  )(position);
}

/**
 * Given a FEN, this function "completes" the fen with a set of sane defaults.
 */
export function sanitizeFEN(fen: string) {
  const fenParts = splitFEN(fen);
  const placement = sanitizePosition(fenParts[0]);

  const sanitizedFEN = [
    placement,
    ...fenParts.slice(1, fenParts.length),
    ...EMPTY_POSITION.split(/\s+/).slice(fenParts.length, EMPTY_POSITION.length)
  ].join(" ");

  return new Chess(sanitizedFEN).fen();
}

/**
 * Returns true if two fen strings are equivalent.
 */
export function fenPositionsEqual(fen1: string, fen2: string) {
  return sanitizeFEN(fen1).split(" ")[0] === sanitizeFEN(fen2).split(" ")[0];
}

/**
 * Returns true if the FEN is valid.
 */
export function isFenValid(fen: string) {
  return validateFenChessJS(fen).valid;
}

/**
 * Throws an error if the FEN is not valid.
 */
function validateFen(fen: string) {
  if (!isFenValid(fen)) {
    throw new Error(`The FEN '${ fen }' is not valid.`);
  }
}

/**
 * Returns the starting player from the FEN.
 */
export function startingPlayer(fen: string) {
  const player = splitFEN(fen)[1];

  if (_.isNil(player)) {
    throw new Error(`The fen '${ fen }' does not contain a starting player.`);
  }

  return player === "b" ? BLACK : WHITE;
}

/**
 * Returns a new FEN string with an altered starting player.
 */
export function setFenStartingPlayer(fen: string, player: Player) {
  validateFen(fen);

  const fenParts = splitFEN(fen);
  fenParts[1] = player === WHITE ? "w" : "b";
  return fenParts.join(" ");
}

const FEN_CASTLE_SYMBOLS = {
  [WHITE]: {
    [KINGSIDE]: "K",
    [QUEENSIDE]: "Q"
  },
  [BLACK]: {
    [KINGSIDE]: "k",
    [QUEENSIDE]: "q"
  }
};

/**
 * Returns true or false depending on whether the given player can castle on the given side.
 */
export function fenCanCastle(fen: string, player: Player, side: Side) {
  validateFen(fen);

  return splitFEN(fen)[2].includes(FEN_CASTLE_SYMBOLS[player][side]);
}

/**
 * Returns a new FEN string with altered castling rights.
 */
export function setFenCanCastle(fen: string, player: Player, side: Side, canCastle: boolean) {
  validateFen(fen);

  let castlingRights = PLAYERS.map(playerValue => {
    return SIDES.map(sideValue => {
      const value = playerValue === player && sideValue === side
        ? canCastle
        : fenCanCastle(fen, playerValue, sideValue);

      return value ? FEN_CASTLE_SYMBOLS[playerValue][sideValue] : "";
    }).join("");
  }).join("");

  if (castlingRights === "") {
    castlingRights = "-";
  }

  const fenParts = splitFEN(fen);
  fenParts[2] = castlingRights;
  return fenParts.join(" ");
}

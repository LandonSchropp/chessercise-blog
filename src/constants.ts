import _ from "lodash";

// Board
export const BOARD_SIZE = 8;

// Ranks and files
export const FILES = "abcdefgh".split("");
export const RANKS = "12345678".split("");

// Squares
export const SQUARES = _.flatMap(FILES, file => {
  return _.map(RANKS, rank => `${ file }${ rank }`);
});

// Positions
export const EMPTY_POSITION = "8/8/8/8/8/8/8/8 w KQkq - 0 1";
export const STARTING_POSITION = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

// Players
export const WHITE = "white";
export const BLACK = "black";
export const PLAYERS = [ WHITE, BLACK ];

// SIDES
export const KINGSIDE = "kingside";
export const QUEENSIDE = "queenside";
export const SIDES = [ KINGSIDE, QUEENSIDE ];

// Pieces
export const PAWN = "pawn";
export const KNIGHT = "knight";
export const BISHOP = "bishop";
export const ROOK = "rook";
export const QUEEN = "queen";
export const KING = "king";

export const PIECES = [
  KING,
  QUEEN,
  ROOK,
  BISHOP,
  KNIGHT,
  PAWN
];

// Square colors
export const LIGHT_SQUARE = "lightSquare";
export const DARK_SQUARE = "darkSquare";

export const SQUARE_COLORS = [ LIGHT_SQUARE, DARK_SQUARE ];

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

export const BLACK_KING = `${ BLACK }${ _.capitalize(KING) }`;
export const BLACK_QUEEN = `${ BLACK }${ _.capitalize(QUEEN) }`;
export const BLACK_ROOK = `${ BLACK }${ _.capitalize(ROOK) }`;
export const BLACK_BISHOP = `${ BLACK }${ _.capitalize(BISHOP) }`;
export const BLACK_KNIGHT = `${ BLACK }${ _.capitalize(KNIGHT) }`;
export const BLACK_PAWN = `${ BLACK }${ _.capitalize(PAWN) }`;
export const WHITE_KING = `${ WHITE }${ _.capitalize(KING) }`;
export const WHITE_QUEEN = `${ WHITE }${ _.capitalize(QUEEN) }`;
export const WHITE_ROOK = `${ WHITE }${ _.capitalize(ROOK) }`;
export const WHITE_BISHOP = `${ WHITE }${ _.capitalize(BISHOP) }`;
export const WHITE_KNIGHT = `${ WHITE }${ _.capitalize(KNIGHT) }`;
export const WHITE_PAWN = `${ WHITE }${ _.capitalize(PAWN) }`;

export const PLAYER_PIECES = [
  BLACK_KING,
  BLACK_QUEEN,
  BLACK_ROOK,
  BLACK_BISHOP,
  BLACK_KNIGHT,
  BLACK_PAWN,
  WHITE_KING,
  WHITE_QUEEN,
  WHITE_ROOK,
  WHITE_BISHOP,
  WHITE_KNIGHT,
  WHITE_PAWN
];

// Square colors
export const LIGHT_SQUARE = "lightSquare";
export const DARK_SQUARE = "darkSquare";

export const SQUARE_COLORS = [ LIGHT_SQUARE, DARK_SQUARE ];

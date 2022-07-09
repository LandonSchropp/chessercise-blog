export const NUMBER_OF_SQUARES = 8;
export const SQUARE_SIZE = 100;
export const BOARD_SIZE = SQUARE_SIZE * NUMBER_OF_SQUARES;

// Chessmen constants (for use inside the library only).
export const INTERNAL_WHITE_KING = 0;
export const INTERNAL_WHITE_QUEEN = 1;
export const INTERNAL_WHITE_ROOK = 2;
export const INTERNAL_WHITE_BISHOP = 3;
export const INTERNAL_WHITE_KNIGHT = 4;
export const INTERNAL_WHITE_PAWN = 5;
export const INTERNAL_BLACK_KING = 6;
export const INTERNAL_BLACK_QUEEN = 7;
export const INTERNAL_BLACK_ROOK = 8;
export const INTERNAL_BLACK_BISHOP = 9;
export const INTERNAL_BLACK_KNIGHT = 10;
export const INTERNAL_BLACK_PAWN = 11;

// The mappings of FEN symbols to the internal constants.
export const FEN_PIECES = {
  "k": INTERNAL_BLACK_KING,
  "q": INTERNAL_BLACK_QUEEN,
  "r": INTERNAL_BLACK_ROOK,
  "b": INTERNAL_BLACK_BISHOP,
  "n": INTERNAL_BLACK_KNIGHT,
  "p": INTERNAL_BLACK_PAWN,
  "K": INTERNAL_WHITE_KING,
  "Q": INTERNAL_WHITE_QUEEN,
  "R": INTERNAL_WHITE_ROOK,
  "B": INTERNAL_WHITE_BISHOP,
  "N": INTERNAL_WHITE_KNIGHT,
  "P": INTERNAL_WHITE_PAWN
};

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

import blackBishop from "../../../images/pieces/black-bishop.svg";
import blackKing from "../../../images/pieces/black-king.svg";
import blackKnight from "../../../images/pieces/black-knight.svg";
import blackPawn from "../../../images/pieces/black-pawn.svg";
import blackQueen from "../../../images/pieces/black-queen.svg";
import blackRook from "../../../images/pieces/black-rook.svg";
import whiteBishop from "../../../images/pieces/white-bishop.svg";
import whiteKing from "../../../images/pieces/white-king.svg";
import whiteKnight from "../../../images/pieces/white-knight.svg";
import whitePawn from "../../../images/pieces/white-pawn.svg";
import whiteQueen from "../../../images/pieces/white-queen.svg";
import whiteRook from "../../../images/pieces/white-rook.svg";

// A mapping of the internal pieces to their corresponding images..
export const PIECE_IMAGES = {
  [INTERNAL_WHITE_KING]: whiteKing,
  [INTERNAL_WHITE_QUEEN]: whiteQueen,
  [INTERNAL_WHITE_ROOK]: whiteRook,
  [INTERNAL_WHITE_BISHOP]: whiteBishop,
  [INTERNAL_WHITE_KNIGHT]: whiteKnight,
  [INTERNAL_WHITE_PAWN]: whitePawn,
  [INTERNAL_BLACK_KING]: blackKing,
  [INTERNAL_BLACK_QUEEN]: blackQueen,
  [INTERNAL_BLACK_ROOK]: blackRook,
  [INTERNAL_BLACK_BISHOP]: blackBishop,
  [INTERNAL_BLACK_KNIGHT]: blackKnight,
  [INTERNAL_BLACK_PAWN]: blackPawn
};

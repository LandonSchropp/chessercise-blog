
import {
  BLACK_BISHOP,
  BLACK_KING,
  BLACK_KNIGHT,
  BLACK_PAWN,
  BLACK_QUEEN,
  BLACK_ROOK,
  WHITE_BISHOP,
  WHITE_KING,
  WHITE_KNIGHT,
  WHITE_PAWN,
  WHITE_QUEEN,
  WHITE_ROOK
} from "../../constants";

export const NUMBER_OF_SQUARES = 8;
export const SQUARE_SIZE = 100;
export const BOARD_SIZE = SQUARE_SIZE * NUMBER_OF_SQUARES;

// The mappings of FEN symbols to the internal constants.
export const FEN_PIECES = {
  "k": BLACK_KING,
  "q": BLACK_QUEEN,
  "r": BLACK_ROOK,
  "b": BLACK_BISHOP,
  "n": BLACK_KNIGHT,
  "p": BLACK_PAWN,
  "K": WHITE_KING,
  "Q": WHITE_QUEEN,
  "R": WHITE_ROOK,
  "B": WHITE_BISHOP,
  "N": WHITE_KNIGHT,
  "P": WHITE_PAWN
};

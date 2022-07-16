import _ from "lodash";

import { File, Piece, Player, PlayerPiece, Rank, Side, Square, SquareColor } from "./types";

// Board
export const BOARD_SIZE = 8;

// Ranks and files
export const FILES = "abcdefgh".split("") as File[];
export const RANKS = "12345678".split("") as Rank[];

// Squares
export const SQUARES: Square[] = _.flatMap(FILES, file => {
  return _.map(RANKS, rank => `${ file }${ rank }` as Square);
});

// Positions
export const EMPTY_POSITION = "8/8/8/8/8/8/8/8 w KQkq - 0 1";
export const STARTING_POSITION = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

// Players
export const WHITE = "white";
export const BLACK = "black";
export const PLAYERS: Player[] = [ WHITE, BLACK ];

// Sides
export const KINGSIDE = "kingside";
export const QUEENSIDE = "queenside";
export const SIDES: Side[] = [ KINGSIDE, QUEENSIDE ];

// Pieces
export const PAWN = "pawn";
export const KNIGHT = "knight";
export const BISHOP = "bishop";
export const ROOK = "rook";
export const QUEEN = "queen";
export const KING = "king";

export const PIECES: Piece[] = [
  KING,
  QUEEN,
  ROOK,
  BISHOP,
  KNIGHT,
  PAWN
];

export const BLACK_KING = `${ BLACK }${ _.capitalize(KING) }` as PlayerPiece;
export const BLACK_QUEEN = `${ BLACK }${ _.capitalize(QUEEN) }` as PlayerPiece;
export const BLACK_ROOK = `${ BLACK }${ _.capitalize(ROOK) }` as PlayerPiece;
export const BLACK_BISHOP = `${ BLACK }${ _.capitalize(BISHOP) }` as PlayerPiece;
export const BLACK_KNIGHT = `${ BLACK }${ _.capitalize(KNIGHT) }` as PlayerPiece;
export const BLACK_PAWN = `${ BLACK }${ _.capitalize(PAWN) }` as PlayerPiece;
export const WHITE_KING = `${ WHITE }${ _.capitalize(KING) }` as PlayerPiece;
export const WHITE_QUEEN = `${ WHITE }${ _.capitalize(QUEEN) }` as PlayerPiece;
export const WHITE_ROOK = `${ WHITE }${ _.capitalize(ROOK) }` as PlayerPiece;
export const WHITE_BISHOP = `${ WHITE }${ _.capitalize(BISHOP) }` as PlayerPiece;
export const WHITE_KNIGHT = `${ WHITE }${ _.capitalize(KNIGHT) }` as PlayerPiece;
export const WHITE_PAWN = `${ WHITE }${ _.capitalize(PAWN) }` as PlayerPiece;

export const PLAYER_PIECES: PlayerPiece[] = [
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
export const LIGHT_SQUARE = "light";
export const DARK_SQUARE = "dark";

export const SQUARE_COLORS: SquareColor[] = [ LIGHT_SQUARE, DARK_SQUARE ];

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

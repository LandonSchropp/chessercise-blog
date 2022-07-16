export type Article = {
  title: string,
  slug: string,
  date: Date,
  description: string,
  published: boolean
};

export type Vector = [
  number,
  number
];

export type Player = "white" | "black";

export type Piece =
  | "king"
  | "queen"
  | "rook"
  | "bishop"
  | "knight"
  | "pawn"

export type PlayerPiece =
  | "blackKing"
  | "blackQueen"
  | "blackRook"
  | "blackBishop"
  | "blackKnight"
  | "blackPawn"
  | "whiteKing"
  | "whiteQueen"
  | "whiteRook"
  | "whiteBishop"
  | "whiteKnight"
  | "whitePawn";

export type NullablePlayerPiece = PlayerPiece | null

export type Rank = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h"
export type File = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8"

export type Square =
  | "a1" | "a2" | "a3" | "a4" | "a5" | "a6" | "a7" | "a8"
  | "b1" | "b2" | "b3" | "b4" | "b5" | "b6" | "b7" | "b8"
  | "c1" | "c2" | "c3" | "c4" | "c5" | "c6" | "c7" | "c8"
  | "d1" | "d2" | "d3" | "d4" | "d5" | "d6" | "d7" | "d8"
  | "e1" | "e2" | "e3" | "e4" | "e5" | "e6" | "e7" | "e8"
  | "f1" | "f2" | "f3" | "f4" | "f5" | "f6" | "f7" | "f8"
  | "g1" | "g2" | "g3" | "g4" | "g5" | "g6" | "g7" | "g8"
  | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "h7" | "h8"

export type Color = "red" | "green" | "yellow" | "blue"

export type Highlight = { color: Color, square: Square }

export type Arrow = { color: Color, from: Square, to: Square }

export type SquareColor = "light" | "dark"

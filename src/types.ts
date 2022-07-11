export type Article = {
  title: string,
  slug: string,
  date: Date,
  description: string,
  published: boolean
};

export type Coordinates = [
  number,
  number
];

export type Player = "white" | "black";

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

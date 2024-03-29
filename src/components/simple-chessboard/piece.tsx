import React from "react";

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
import BLACK_BISHOP_IMAGE from "../../images/pieces/black-bishop.svg";
import BLACK_KING_IMAGE from "../../images/pieces/black-king.svg";
import BLACK_KNIGHT_IMAGE from "../../images/pieces/black-knight.svg";
import BLACK_PAWN_IMAGE from "../../images/pieces/black-pawn.svg";
import BLACK_QUEEN_IMAGE from "../../images/pieces/black-queen.svg";
import BLACK_ROOK_IMAGE from "../../images/pieces/black-rook.svg";
import WHITE_BISHOP_IMAGE from "../../images/pieces/white-bishop.svg";
import WHITE_KING_IMAGE from "../../images/pieces/white-king.svg";
import WHITE_KNIGHT_IMAGE from "../../images/pieces/white-knight.svg";
import WHITE_PAWN_IMAGE from "../../images/pieces/white-pawn.svg";
import WHITE_QUEEN_IMAGE from "../../images/pieces/white-queen.svg";
import WHITE_ROOK_IMAGE from "../../images/pieces/white-rook.svg";
import { Player, PlayerPiece, Vector } from "../../types";
import { orientIndices } from "../../utilities/squares";
import { SQUARE_SIZE } from "./constants";

// A mapping of the internal pieces to their corresponding images..
export const PIECE_IMAGES = {
  [WHITE_KING]: WHITE_KING_IMAGE,
  [WHITE_QUEEN]: WHITE_QUEEN_IMAGE,
  [WHITE_ROOK]: WHITE_ROOK_IMAGE,
  [WHITE_BISHOP]: WHITE_BISHOP_IMAGE,
  [WHITE_KNIGHT]: WHITE_KNIGHT_IMAGE,
  [WHITE_PAWN]: WHITE_PAWN_IMAGE,
  [BLACK_KING]: BLACK_KING_IMAGE,
  [BLACK_QUEEN]: BLACK_QUEEN_IMAGE,
  [BLACK_ROOK]: BLACK_ROOK_IMAGE,
  [BLACK_BISHOP]: BLACK_BISHOP_IMAGE,
  [BLACK_KNIGHT]: BLACK_KNIGHT_IMAGE,
  [BLACK_PAWN]: BLACK_PAWN_IMAGE
};

function convertCoordinateToSVG(coordinates: Vector, orientation: Player) {
  const orientedCoordinates = orientIndices(coordinates, orientation);
  return [ orientedCoordinates[0] * SQUARE_SIZE, orientedCoordinates[1] * SQUARE_SIZE ];
}

type PieceProps = {
  rankIndex: number,
  fileIndex: number,
  piece: PlayerPiece | null,
  orientation: Player
}

export function Piece({
  rankIndex,
  fileIndex,
  piece,
  orientation
}: PieceProps) {

  if (piece === null) {
    return null;
  }

  // Convert the indices to the SVG coordinate space.
  const coordinates = convertCoordinateToSVG([ fileIndex, rankIndex ], orientation);

  return <image
    x={ coordinates[0] }
    y={ coordinates[1] }
    width={ SQUARE_SIZE }
    height={ SQUARE_SIZE }
    href={ PIECE_IMAGES[piece] }
  />;
}

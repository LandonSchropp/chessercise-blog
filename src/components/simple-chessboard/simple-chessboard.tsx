import _ from "lodash";
import React from "react";

import { BLACK, EMPTY_POSITION, WHITE } from "../../constants";
import { BOARD_SIZE, SQUARE_SIZE } from "./simple-chessboard-constants";
// import { SimpleChessboardCoordinates } from "./simple-chessboard-coordinates";
// import { SimpleChessboardPieceOverlay } from "./simple-chessboard-piece-overlay";
// import { SimpleChessboardPieces } from "./simple-chessboard-pieces";
import { SimpleChessboardSquares } from "./simple-chessboard-squares";

interface SimpleChessboardProps {
  fen?: string
  coordinates: "none" | "outside" | "inside"
  orientation: "white" | "black"
}

/**
 * A super-simple chessboard implementation.
 */
export function SimpleChessboard({ fen, coordinates, orientation }: SimpleChessboardProps) {

  // Ensure the position is always populated.
  fen = _.isNil(fen) ? EMPTY_POSITION : fen;

  const inset = coordinates === "outside";
  const viewBoxSize = inset ? SQUARE_SIZE * 9 : BOARD_SIZE;

  // TODO: Add a border.
  return <svg viewBox={ `0 0 ${ viewBoxSize } ${ viewBoxSize }` }>;
    <SimpleChessboardSquares inset={ inset } />
  </svg>;
}

SimpleChessboard.defaultProps = {
  position: null,
  orientation: WHITE,
  coordinates: "none"
};

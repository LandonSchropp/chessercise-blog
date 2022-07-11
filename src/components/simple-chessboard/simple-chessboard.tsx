import _ from "lodash";
import React from "react";

import { EMPTY_POSITION, WHITE } from "../../constants";
import { SQUARE_SIZE } from "./simple-chessboard-constants";
import { SimpleChessboardCoordinates } from "./simple-chessboard-coordinates";
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

  // TODO: Determine these properties from the FEN.
  const numberOfRanks = 8;
  const numberOfFiles = 8;

  const inset = coordinates === "outside";
  const viewBoxWidth = SQUARE_SIZE * (numberOfFiles + (inset ? 1 : 0));
  const viewBoxHeight = SQUARE_SIZE * (numberOfRanks + (inset ? 1 : 0));

  // TODO: Add a border.
  return <svg
    className="max-w-sm mx-auto"
    viewBox={ `0 0 ${ viewBoxWidth } ${ viewBoxHeight }` }
  >;
    <SimpleChessboardSquares
      inset={ inset }
      numberOfRanks={ numberOfRanks }
      numberOfFiles={ numberOfFiles }
    />
    <SimpleChessboardCoordinates
      orientation={ orientation }
      coordinates={ coordinates }
      numberOfRanks={ numberOfRanks }
      numberOfFiles={ numberOfFiles }
    />
  </svg>;
}

SimpleChessboard.defaultProps = {
  position: null,
  orientation: WHITE,
  coordinates: "none"
};

import _ from "lodash";
import React from "react";

import { EMPTY_POSITION, WHITE } from "../../constants";
import { parsedPositionSize, parsePosition } from "../../utilities/fen";
import { SQUARE_SIZE } from "./simple-chessboard-constants";
import { SimpleChessboardCoordinates } from "./simple-chessboard-coordinates";
import { SimpleChessboardPieces } from "./simple-chessboard-pieces";
// import { SimpleChessboardPieceOverlay } from "./simple-chessboard-piece-overlay";
import { SimpleChessboardSquares } from "./simple-chessboard-squares";

interface SimpleChessboardProps {
  fen?: string
  coordinates: "none" | "outside" | "inside"
  orientation: "white" | "black"
}

/**
 * A super-simple React chessboard.
 * @param params.fen The FEN to render. If the FEN changes, then the chessboard automatically
 * animates the change.
 * @param params.coordinates Determies how the chessboard coordinates are rendered. This can be
 * `"outside"`, `"inside"` or `"none"`.
 * @param params.orientation Determines the direction the board should be oriented towards.
 */
export function SimpleChessboard({ fen, coordinates, orientation }: SimpleChessboardProps) {

  // Ensure the position is always populated.
  fen = _.isNil(fen) ? EMPTY_POSITION : fen;
  const parsedPosition = parsePosition(fen);

  // TODO: Determine these properties from the FEN.
  const [ numberOfRanks, numberOfFiles ] = parsedPositionSize(parsedPosition);

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
      numberOfRanks={ numberOfRanks }
      numberOfFiles={ numberOfFiles }
    />
    <SimpleChessboardPieces
      orientation={ orientation }
      position={ fen }
    />
  </svg>;
}

SimpleChessboard.defaultProps = {
  position: null,
  orientation: WHITE,
  coordinates: "none"
};

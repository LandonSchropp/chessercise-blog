import _ from "lodash";
import React from "react";

import { EMPTY_POSITION, WHITE } from "../../constants";
import { Highlight } from "../../types";
import { parsedPositionSize, parsePosition } from "../../utilities/fen";
import { SQUARE_SIZE } from "./simple-chessboard-constants";
import { SimpleChessboardCoordinates } from "./simple-chessboard-coordinates";
import { SimpleChessboardHighlights } from "./simple-chessboard-highlights";
import { SimpleChessboardPieces } from "./simple-chessboard-pieces";
import { SimpleChessboardSquares } from "./simple-chessboard-squares";

interface SimpleChessboardProps {
  fen?: string
  orientation: "white" | "black",
  highlights: Highlight[]
}

/**
 * A super-simple React chessboard.
 * @param params.fen The FEN to render. If the FEN changes, then the chessboard automatically
 * animates the change.
 * @param params.orientation Determines the direction the board should be oriented towards.
 * @param params.highlights An array of squares to highlight.
 */
export function SimpleChessboard({ fen, orientation, highlights }: SimpleChessboardProps) {

  // Ensure the position is always populated.
  fen = _.isNil(fen) ? EMPTY_POSITION : fen;
  const parsedPosition = parsePosition(fen);

  // TODO: Determine these properties from the FEN.
  const [ numberOfRanks, numberOfFiles ] = parsedPositionSize(parsedPosition);

  const viewBoxWidth = numberOfFiles * SQUARE_SIZE;
  const viewBoxHeight = numberOfRanks * SQUARE_SIZE;

  // TODO: Add a border.
  return <svg
    className="max-w-sm mx-auto"
    viewBox={ `0 0 ${ viewBoxWidth } ${ viewBoxHeight }` }
  >;
    <SimpleChessboardSquares
      numberOfRanks={ numberOfRanks }
      numberOfFiles={ numberOfFiles }
    />
    <SimpleChessboardHighlights
      orientation={ orientation }
      highlights={ highlights }
      numberOfRanks={ numberOfRanks }
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
  highlights: []
};

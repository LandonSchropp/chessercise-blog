import _ from "lodash";
import React from "react";

import { BOARD_SIZE, EMPTY_POSITION, WHITE } from "../../constants";
import { Arrow, Highlight } from "../../types";
import { Arrows } from "./arrows";
import { SQUARE_SIZE } from "./constants";
import { Coordinates } from "./coordinates";
import { Highlights } from "./highlights";
import { Pieces } from "./pieces";
import { Squares } from "./squares";

interface SimpleChessboardProps {
  fen?: string
  orientation: "white" | "black",
  highlights: Highlight[],
  arrows: Arrow[],
  numberOfFiles: number,
  numberOfRanks: number,
  coordinates: "auto" | "never"
}

/**
 * A super-simple React chessboard.
 * @param params
 * @param params.fen The FEN to render. If the FEN changes, then the chessboard automatically
 * animates the change.
 * @param params.orientation Determines the direction the board should be oriented towards.
 * @param params.highlights An array of squares to highlight.
 * @param params.arrows An array of arrows to render.
 * @param params.numberOfFiles The number of files to include in the board.
 * @param params.numberOfRanks The number of ranks to include in the board.
 * @param params.coordinates Whether or not to include coordinates.
 */
export function SimpleChessboard({
  fen,
  orientation,
  highlights,
  arrows,
  numberOfFiles,
  numberOfRanks,
  coordinates
}: SimpleChessboardProps) {

  // Ensure the position is always populated.
  fen = _.isNil(fen) ? EMPTY_POSITION : fen;

  // Determine the viewBox size.
  const viewBoxWidth = numberOfFiles * SQUARE_SIZE;
  const viewBoxHeight = numberOfRanks * SQUARE_SIZE;

  // TODO: Add a border.
  return <svg viewBox={ `0 0 ${ viewBoxWidth } ${ viewBoxHeight }` }>
    <Squares
      numberOfRanks={ numberOfRanks }
      numberOfFiles={ numberOfFiles }
    />
    <Highlights
      orientation={ orientation }
      highlights={ highlights }
      numberOfRanks={ numberOfRanks }
    />
    {
      coordinates === "never"
        ? null
        : <Coordinates
          orientation={ orientation }
          numberOfRanks={ numberOfRanks }
          numberOfFiles={ numberOfFiles }
        />
    }
    <Pieces
      orientation={ orientation }
      position={ fen }
    />
    <Arrows
      orientation={ orientation }
      arrows={ arrows }
      numberOfRanks={ numberOfRanks }
    />
  </svg>;
}

SimpleChessboard.defaultProps = {
  position: null,
  orientation: WHITE,
  highlights: [],
  arrows: [],
  numberOfFiles: BOARD_SIZE,
  numberOfRanks: BOARD_SIZE,
  coordinates: "auto"
};

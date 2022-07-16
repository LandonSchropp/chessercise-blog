import React from "react";

import { Highlight, Player, Square, Vector } from "../../types";
import {
  orientIndices,
  reverseYIndex,
  squareColor,
  squareToIndices
} from "../../utilities/squares";
import { SQUARE_SIZE } from "./simple-chessboard-constants";

type SimpleChessboardHighlightProps = {
  highlight: Highlight,
  orientation: Player,
  numberOfRanks: number
}

export function squareToSVGCoordinates(
  square: Square,
  orientation: Player,
  numberOfRanks: number
): Vector {
  const [ fileIndex, rankIndex ] = orientIndices(squareToIndices(square), orientation);
  return [ fileIndex * SQUARE_SIZE, (numberOfRanks - rankIndex - 1) * SQUARE_SIZE ] as Vector;
}

function SimpleChessboardHighlight({
  highlight,
  orientation,
  numberOfRanks
}: SimpleChessboardHighlightProps) {
  const [ x, y ] = squareToSVGCoordinates(highlight.square, orientation, numberOfRanks);

  const styles = {
    red: {
      light: "fill-strawberryWine",
      dark: "fill-fuzzyWuzzyBrown"
    },
    green: {
      light: "fill-aquaForest opacity-70",
      dark: "fill-aquaForest opacity-70"
    },
    blue: {
      light: "fill-malibu opacity-80",
      dark: "fill-malibu opacity-80"
    },
    yellow: {
      light: "fill-saffron opacity-70",
      dark: "fill-saffron opacity-70"
    }
  };

  return <rect
    className={ styles[highlight.color][squareColor(highlight.square)] }
    x={ x }
    y={ y }
    width={ SQUARE_SIZE }
    height={ SQUARE_SIZE }
  />;
}

type SimpleChessboardHighlightsProps = {
  highlights: Highlight[],
  orientation: Player,
  numberOfRanks: number
}

/**
 * Returns the squares for a SimpleChessboard.
 */
export function SimpleChessboardHighlights({
  highlights,
  orientation,
  numberOfRanks
}: SimpleChessboardHighlightsProps) {
  return <g className="simple-chessboard__highlights">
    {
      highlights.map(highlight => {
        return <SimpleChessboardHighlight
          key={ `${ highlight.color }-${ highlight.square }` }
          highlight={ highlight }
          orientation={ orientation }
          numberOfRanks={ numberOfRanks }
        />;
      })
    }
  </g>;
}

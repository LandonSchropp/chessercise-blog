import React from "react";

import { Highlight as HighlightType, Player } from "../../types";
import { squareColor } from "../../utilities/squares";
import { SQUARE_SIZE } from "./constants";
import { squareToSVGCoordinates } from "./svg";

type HighlightProps = {
  highlight: HighlightType,
  orientation: Player,
  numberOfRanks: number
}

function Highlight({
  highlight,
  orientation,
  numberOfRanks
}: HighlightProps) {
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
      light: "fill-neonCarrot opacity-70",
      dark: "fill-neonCarrot opacity-70"
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

type HighlightsProps = {
  highlights: HighlightType[],
  orientation: Player,
  numberOfRanks: number
}

export function Highlights({
  highlights,
  orientation,
  numberOfRanks
}: HighlightsProps) {
  return <g className="simple-chessboard__highlights">
    {
      highlights.map(highlight => {
        return <Highlight
          key={ `${ highlight.color }-${ highlight.square }` }
          highlight={ highlight }
          orientation={ orientation }
          numberOfRanks={ numberOfRanks }
        />;
      })
    }
  </g>;
}

import _ from "lodash";
import React from "react";

import { SQUARE_SIZE } from "./simple-chessboard-constants";

type SquareProps = {
  fileIndex: number,
  rankIndex: number
};

function Square({ fileIndex, rankIndex }: SquareProps) {
  const squareColor = (fileIndex + rankIndex) % 2 === 0 ? "fill-concrete" : "fill-mediumPurple";

  return <rect
    className={ squareColor }
    x={ fileIndex * SQUARE_SIZE }
    y={ rankIndex * SQUARE_SIZE }
    width={ SQUARE_SIZE }
    height={ SQUARE_SIZE }
  />;
}

type SimpleChessboardSquaresType = {
  numberOfRanks: number,
  numberOfFiles: number
}

/**
 * Returns the squares for a SimpleChessboard.
 */
export function SimpleChessboardSquares({
  numberOfRanks,
  numberOfFiles
}: SimpleChessboardSquaresType) {
  return <g className="simple-chessboard__squares">
    {
      _.times(numberOfFiles, (fileIndex) => {
        return _.times(numberOfRanks, (rankIndex) => {
          return <Square
            key={ rankIndex }
            fileIndex={ fileIndex }
            rankIndex={ rankIndex }
          />;
        });
      })
    }
  </g>;
}

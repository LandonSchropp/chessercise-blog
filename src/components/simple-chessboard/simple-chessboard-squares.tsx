// import { useDroppable } from "@dnd-kit/core";
// import classNames from "classnames";
import _ from "lodash";
import React from "react";

import { SQUARE_SIZE } from "./simple-chessboard-constants";

type SquareProps = {
  fileIndex: number,
  rankIndex: number,
  inset: boolean
};

function Square({ fileIndex, rankIndex, inset }: SquareProps) {
  // const { setNodeRef } = useDroppable({ id: "square" });

  const squareColor = (fileIndex + rankIndex) % 2 === 0 ? "fill-concrete" : "fill-mediumPurple";

  return <rect
    className={ squareColor }
    // ref={ setNodeRef }
    x={ (fileIndex + (inset ? 0.5 : 0)) * SQUARE_SIZE }
    y={ (rankIndex + (inset ? 0.5 : 0)) * SQUARE_SIZE }
    width={ SQUARE_SIZE }
    height={ SQUARE_SIZE }
  />;
}

type SimpleChessboardSquaresType = {
inset: boolean,
  numberOfRanks: number,
  numberOfFiles: number
}

/**
 * Returns the squares for a SimpleChessboard.
 */
export function SimpleChessboardSquares(
  { inset, numberOfRanks, numberOfFiles }: SimpleChessboardSquaresType
) {
  return <g className="simple-chessboard__squares">
    {
      _.times(numberOfFiles, (fileIndex) => {
        return _.times(numberOfRanks, (rankIndex) => {
          return <Square
            key={ rankIndex }
            fileIndex={ fileIndex }
            rankIndex={ rankIndex }
            inset={ inset }
          />;
        });
      })
    }
  </g>;
}

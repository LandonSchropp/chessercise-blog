import React from "react";

import { Player } from "../../types";
import { parsePosition } from "../../utilities/fen";
import { SimpleChessboardPiece } from "./simple-chessboard-piece";

/* eslint-disable react/no-array-index-key */

type SimpleChessboardPiecesProps = {
  position: string,
  orientation: Player
}

export function SimpleChessboardPieces({
  position,
  orientation
}: SimpleChessboardPiecesProps) {
  const parsedPosition = parsePosition(position);

  return <g className="simple-chessboard__pieces">
    {
      parsedPosition.map((row, rankIndex) => {
        return row.map((piece, fileIndex) => {
          return <SimpleChessboardPiece
            key={ `${ rankIndex }-${ fileIndex }` }
            rankIndex={ rankIndex }
            fileIndex={ fileIndex }
            piece={ piece }
            orientation={ orientation }
          />;
        });
      })
    }
  </g>;
}

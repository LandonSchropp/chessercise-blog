import React from "react";

import { Player } from "../../types";
import { parsePosition } from "../../utilities/fen";
import { Piece } from "./piece";

/* eslint-disable react/no-array-index-key */

type PiecesProps = {
  position: string,
  orientation: Player
}

export function Pieces({
  position,
  orientation
}: PiecesProps) {
  const parsedPosition = parsePosition(position);

  return <g className="simple-chessboard__pieces">
    {
      parsedPosition.map((row, rankIndex) => {
        return row.map((piece, fileIndex) => {
          return <Piece
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

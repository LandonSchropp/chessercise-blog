import React from "react";

import { Player } from "../../types";
import { parsePosition, resizeParsedPosition } from "../../utilities/fen";
import { Piece } from "./piece";

/* eslint-disable react/no-array-index-key */

type PiecesProps = {
  position: string,
  orientation: Player,
  numberOfRanks: number,
  numberOfFiles: number
}

export function Pieces({
  position,
  orientation,
  numberOfRanks,
  numberOfFiles
}: PiecesProps) {
  const parsedPosition = resizeParsedPosition(
    parsePosition(position),
    numberOfFiles,
    numberOfRanks
  );

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

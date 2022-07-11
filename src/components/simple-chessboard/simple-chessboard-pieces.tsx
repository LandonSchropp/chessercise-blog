import _ from "lodash";
import React from "react";

import { Player, PlayerPiece } from "../../types";
import { FEN_PIECES, NUMBER_OF_SQUARES } from "./simple-chessboard-constants";
import { SimpleChessboardPiece } from "./simple-chessboard-piece";

/**
 * Parses a FEN into a flat array of pieces.
 */
export function parsePosition(position: string): (PlayerPiece | null)[] {
  if (!_.isString(position)) {
    return new Array(NUMBER_OF_SQUARES * NUMBER_OF_SQUARES).fill(null);
  }

  const parsedPosition = position
    .split(" ")[0]
    .replace(/\//g, "");

  const parsedCharacters = Array.from(parsedPosition).map(character => {
    return /\d/.test(character)
      ? new Array(parseInt(character, 10)).fill(null)
      // eslint-disable-next-line no-extra-parens
      : (FEN_PIECES as Record<string, PlayerPiece>)[character] || null;
  });

  return _.flatten(parsedCharacters);
}

/* eslint-disable react/no-array-index-key */

type SimpleChessboardPiecesProps = {
  position: string,
  orientation: Player
}

export function SimpleChessboardPieces({
  position,
  orientation
}: SimpleChessboardPiecesProps) {
  const pieces = parsePosition(position);

  return <g className="simple-chessboard__pieces">
    {
      pieces.map((piece: PlayerPiece | null, index: number) => {
        return <SimpleChessboardPiece
          key={ index }
          index={ index }
          piece={ piece }
          orientation={ orientation }
        />;
      })
    }
  </g>;
}

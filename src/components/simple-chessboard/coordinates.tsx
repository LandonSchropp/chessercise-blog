import _ from "lodash";
import React from "react";

import { BOARD_SIZE, DARK_SQUARE, FILES, LIGHT_SQUARE, RANKS, WHITE } from "../../constants";
import { Player } from "../../types";
import { SQUARE_SIZE } from "./constants";

type Position = "bottom" | "left";

const HORIZONTAL_OFFSET = SQUARE_SIZE / 32;
const VERTIAL_OFFSET = SQUARE_SIZE * 2 / 32;

type CoordinateProps = {
  orientation: Player,
  position: Position,
  index: number,
  numberOfRanks: number,
  numberOfFiles: number
};

function Coordinate({
  position,
  index,
  orientation,
  numberOfRanks,
  numberOfFiles
}: CoordinateProps) {
  const isRank = position === "left";

  const coordinate = isRank
    ? RANKS[orientation === WHITE ? numberOfRanks - 1 - index : index]
    : FILES[orientation === WHITE ? index : numberOfFiles - 1 - index];

  const x = isRank
    ? HORIZONTAL_OFFSET
    : SQUARE_SIZE * (index + 1) - HORIZONTAL_OFFSET;

  const y = isRank
    ? SQUARE_SIZE * index + VERTIAL_OFFSET
    : numberOfRanks * SQUARE_SIZE - VERTIAL_OFFSET;

  const square = (index + (isRank ? 1 : 0)) % 2 ? LIGHT_SQUARE : DARK_SQUARE;

  const positionProps = position === "left"
    ? { "dominantBaseline": "hanging" }
    : { "dominantBaseline": "text-bottom", "textAnchor": "end" };

  return <text
    className={ `font-sans ${ square === DARK_SQUARE ? "fill-concrete" : "fill-mediumPurple" }` }
    x={ x }
    y={ y }
    data-position={ position }
    data-square={ square }
    { ...positionProps }
  >
    { coordinate }
  </text>;
}

type CoordinatesProps = {
  orientation: Player,
  numberOfFiles: number,
  numberOfRanks: number
};

export function Coordinates({
  orientation,
  numberOfFiles,
  numberOfRanks
}: CoordinatesProps) {
  if (numberOfRanks !== BOARD_SIZE || numberOfFiles !== BOARD_SIZE) {
    return null;
  }

  return <g>
    {
      _.times(numberOfRanks, (index: number) => {
        return <Coordinate
          key={ `left-${ index }` }
          index={ index }
          position="left"
          orientation={ orientation }
          numberOfRanks={ numberOfRanks }
          numberOfFiles={ numberOfFiles }
        />;
      })
    }
    {
      _.times(numberOfRanks, (index: number) => {
        return <Coordinate
          key={ `bottom-${ index }` }
          index={ index }
          position="bottom"
          orientation={ orientation }
          numberOfRanks={ numberOfRanks }
          numberOfFiles={ numberOfFiles }
        />;
      })
    }
  </g>;
}

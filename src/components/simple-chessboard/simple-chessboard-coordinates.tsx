import _ from "lodash";
import React from "react";

import { BOARD_SIZE, DARK_SQUARE, FILES, LIGHT_SQUARE, RANKS, WHITE } from "../../constants";
import { Player } from "../../types";
import { SQUARE_SIZE } from "./simple-chessboard-constants";

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
  numberOfRanks: number,
  position: Position
}

function Coordinates({
  position,
  orientation,
  numberOfFiles,
  numberOfRanks
} : CoordinatesProps) {
  const isRank = position === "left";

  return <>
    {
      // HACK: There's a bug in TypeScript that prevents us from returning the array directly.
      // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20356#issuecomment-435708501
      _.times(isRank ? numberOfRanks : numberOfFiles, (index: number) => {
        return <Coordinate
          key={ `${ position }-${ index }` }
          index={ index }
          position={ position }
          orientation={ orientation }
          numberOfRanks={ numberOfRanks }
          numberOfFiles={ numberOfFiles }
        />;
      })
    }
  </>;
}

type SimpleChessboardCoordinatesProps = {
  orientation: "black" | "white",
  numberOfFiles: number,
  numberOfRanks: number
};

export function SimpleChessboardCoordinates({
  orientation,
  numberOfFiles,
  numberOfRanks
}: SimpleChessboardCoordinatesProps) {
  if (numberOfRanks !== BOARD_SIZE || numberOfFiles !== BOARD_SIZE) {
    return null;
  }

  const coordinatesProps = {
    orientation,
    numberOfFiles,
    numberOfRanks
  };

  return <g>
    <Coordinates position="left" { ...coordinatesProps } />
    <Coordinates position="bottom" { ...coordinatesProps } />
  </g>;
}

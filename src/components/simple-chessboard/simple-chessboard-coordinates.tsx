import _ from "lodash";
import React from "react";

import { DARK_SQUARE, FILES, LIGHT_SQUARE, RANKS, WHITE } from "../../constants";
import { SQUARE_SIZE } from "./simple-chessboard-constants";

type Player = "white" | "black"
type Position = "bottom" | "left" | "top" | "right"
type Coordinates = "none" | "inside" | "outside"

const INSIDE_HORIZONTAL_OFFSET = SQUARE_SIZE / 32;
const INSIDE_VERTIAL_OFFSET = SQUARE_SIZE * 3 / 64;

type OutsideCoordinateProps = {
  orientation: Player,
  position: Position,
  index: number,
  numberOfRanks: number,
  numberOfFiles: number
};

function dynamicOffset(
  isStart: boolean,
  isRank: boolean,
  numberOfRanks: number,
  numberOfFiles: number
) {
  const size = isRank ? numberOfFiles : numberOfRanks;

  return (isStart ? 0 : size + 0.5) * SQUARE_SIZE + SQUARE_SIZE / 4;
}

function OutsideCoordinate(
  { position, index, orientation, numberOfRanks, numberOfFiles }: OutsideCoordinateProps
) {
  const isRank = position === "left" || position === "right";
  const isStart = position === "left" || position === "top";

  const coordinate = isRank
    ? RANKS[orientation === WHITE ? numberOfRanks - 1 - index : index]
    : FILES[orientation === WHITE ? index : numberOfFiles - 1 - index];

  const staticXOrY = SQUARE_SIZE * (index + 1);
  const dynamicXOrY = dynamicOffset(isStart, isRank, numberOfRanks, numberOfFiles);

  return <text
    className="fill-gray"
    x={ isRank ? dynamicXOrY : staticXOrY }
    y={ isRank ? staticXOrY : dynamicXOrY }
    textAnchor="middle"
    dominantBaseline="central"
  >
    { coordinate }
  </text>;
}

type InsideCoordinateProps = {
  orientation: Player,
  position: Position,
  index: number,
  numberOfRanks: number,
  numberOfFiles: number
};

function InsideCoordinate({
  position,
  index,
  orientation,
  numberOfRanks,
  numberOfFiles
}: InsideCoordinateProps) {
  if (position === "top" || position === "right") {
    return null;
  }

  const isRank = position === "left";

  const coordinate = isRank
    ? RANKS[orientation === WHITE ? numberOfRanks - 1 - index : index]
    : FILES[orientation === WHITE ? index : numberOfFiles - 1 - index];

  const x = isRank
    ? INSIDE_HORIZONTAL_OFFSET
    : SQUARE_SIZE * (index + 1) - INSIDE_HORIZONTAL_OFFSET;

  const y = isRank
    ? SQUARE_SIZE * index + INSIDE_VERTIAL_OFFSET
    : numberOfRanks * SQUARE_SIZE - INSIDE_VERTIAL_OFFSET;

  const square = (index + (isRank ? 1 : 0)) % 2 ? LIGHT_SQUARE : DARK_SQUARE;

  const positionProps = position === "left"
    ? { "dominantBaseline": "hanging" }
    : { "textAnchor": "end" };

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
  inside: boolean,
  position: Position
}

function Coordinates({
  position,
  inside,
  orientation,
  numberOfFiles,
  numberOfRanks
} : CoordinatesProps) {
  const isRank = position === "left" || position === "right";

  return <>
    {
      // HACK: There's a bug in TypeScript that prevents us from returning the array directly.
      // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20356#issuecomment-435708501
      _.times(isRank ? numberOfRanks : numberOfFiles, (index: number) => {
        if (inside) {
          return <InsideCoordinate
            key={ `${ position }-${ index }` }
            index={ index }
            position={ position }
            orientation={ orientation }
            numberOfRanks={ numberOfRanks }
            numberOfFiles={ numberOfFiles }
          />;
        }

        return <OutsideCoordinate
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
  coordinates: "none" | "inside" | "outside",
  numberOfFiles: number,
  numberOfRanks: number
};

export function SimpleChessboardCoordinates({
  orientation,
  coordinates,
  numberOfFiles,
  numberOfRanks
}: SimpleChessboardCoordinatesProps) {
  if (coordinates === "none") {
    return null;
  }

  const coordinatesProps = {
    inside: coordinates === "inside",
    orientation,
    numberOfFiles,
    numberOfRanks
  };

  return <g>
    <Coordinates position="left" { ...coordinatesProps } />
    <Coordinates position="bottom" { ...coordinatesProps } />
    <Coordinates position="right" { ...coordinatesProps } />
    <Coordinates position="top" { ...coordinatesProps } />
  </g>;
}

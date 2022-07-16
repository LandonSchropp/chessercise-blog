import React from "react";

import { Arrow as ArrowType, Player } from "../../types";
import { Arrow } from "./arrow";

type ArrowsProps = {
  arrows: ArrowType[],
  orientation: Player,
  numberOfRanks: number
}

export function Arrows({ arrows, orientation, numberOfRanks }: ArrowsProps) {
  return <>
    {
      arrows.map(arrow => {
        return <Arrow
          key={ `${ arrow.color }-${ arrow.from }-${ arrow.to }` }
          arrow={ arrow }
          orientation={ orientation }
          numberOfRanks={ numberOfRanks }
        />;
      })
    }
  </>;
}

import React from "react";

import { Arrow, Color, Highlight, Square } from "../types";
import { isFenValid } from "../utilities/fen";
import { SimpleChessboard } from "./simple-chessboard";

const BOARD_SIZE_REGEX = /\b([1-8])x([1-8])\b/g;
const HIGHLIGHT_REGEX = /\b([RGBY])([a-h][1-8])\b/g;
const ARROW_REGEX = /\b([RGBY])([a-h][1-8])([a-h][1-8])\b/g;

const COLORS: Record<string, Color> = {
  R: "red",
  G: "green",
  B: "blue",
  Y: "yellow"
};

type ColorsKey = keyof typeof COLORS;

function parseBoardSize(content?: string) {
  if (!content) {
    return [];
  }

  const match = BOARD_SIZE_REGEX.exec(content);

  if (!match) {
    return {};
  }

  return {
    numberOfFiles: parseInt(match[1], 10),
    numberOfRanks: parseInt(match[2], 10)
  };
}

function parseHighlights(content?: string): Highlight[] {
  if (!content) {
    return [];
  }

  return Array.from(content.matchAll(HIGHLIGHT_REGEX)).map(match => ({
    color: COLORS[match[1] as ColorsKey],
    square: match[2] as Square
  }));
}

function parseArrows(content?: string): Arrow[] {
  if (!content) {
    return [];
  }

  return Array.from(content.matchAll(ARROW_REGEX)).map(match => ({
    color: COLORS[match[1] as ColorsKey],
    from: match[2] as Square,
    to: match[3] as Square
  }));
}

/**
 * This is a special wrapper for this blog's chessboard that can take either custom-formatted FENs
 * or PGNs. It's smart enough to tell the difference, as well as to parse the content and put it
 * into a chessboard.
 *
 * This class's content can be in a few different formats.
 *
 * * A one-line FEN string. Unlike normal FEN strings, this chessboard supports strings for board
 *   smaller than 8 × 8. The board size will be inferred from the FEN.
 * * A two-line FEN string. The first line contains a FEN as described above. Additional lines
 *   contain a mismash of custom formatting for the board.
 *   * Highlights: Highlights are denoted as `<color><square>`, where the color is one of
 *     `R`, `G`, `B` or `Y`. For example, `Ba7` is a valid highlight.
 *   * Arrows are denoted by `<color><from><to>` in a similar format, such as `Yg1a7`.
 *   * Board size: The board size is denoted by <width>x<height>. The width and height must be
 *     positive integers between 1 and 8.
 * * A valid PGN, including comments. (TODO)
 */
export function ContentChessboard({ content }: { content: string }) {
  const [ fen, ...remainingLines ] = content.split("\n");
  const customFormatting = remainingLines.join(" ");

  if (isFenValid(fen)) {
    const boardSizeProps = parseBoardSize(customFormatting);
    const highlights = parseHighlights(customFormatting);
    const arrows = parseArrows(customFormatting);

    return <div className="my-4">
      <SimpleChessboard
        fen={ fen }
        highlights={ highlights }
        arrows={ arrows }
        { ...boardSizeProps }
      />
    </div>;
  }

  throw new Error("The content of this code block could not be parsed!");
}

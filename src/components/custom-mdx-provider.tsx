import { MDXProvider } from "@mdx-js/react";
import React from "react";

import { PgnChessboard } from "./pgn-chessboard";

function Identity({ children }: {children: JSX.Element}) {
  return children;
}

type ChessboardCodeProps = {
  className?: string,
  children: JSX.Element
};

// HACK: The way code formatting is passed to the MDX custom components is a little strange. Rather
// than carrying that interface into the rest of this codebase, I opted to write an adapter
// component to simply the transition. We can get away with this since we don't have any other use
// cases for code formatting.
function ChessboardCode({ className: language, children: pgn }: ChessboardCodeProps) {
  if (typeof language !== "string") {
    throw new Error("Code blocks cannot be used for anything except for PGNs!");
  }

  return <PgnChessboard pgn={ pgn } />;
}

/**
 * This wraps MDXProvider, providing my own custom implementation.
 */
export function CustomMDXProvider({ children }: { children: JSX.Element }) {
  const components = { pre: Identity, code: ChessboardCode };

  return <MDXProvider components={ components }>
    { children }
  </MDXProvider>;
}

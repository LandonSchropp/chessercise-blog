import {
  Chess,
  Color as ChessJSColor,
  Move as ChessJSMove,
  PieceSymbol as ChessJSPiece } from "chess.js/src/chess";
import _ from "lodash";

import {
  BISHOP,
  BLACK,
  KING,
  KINGSIDE,
  KNIGHT,
  PAWN,
  QUEEN,
  QUEENSIDE,
  ROOK,
  STARTING_POSITION,
  WHITE
} from "../constants";
import { Arrow, Highlight, Piece, Player, Square } from "../types";
import { fenCanCastle, startingPlayer } from "./fen";

interface Position {
  fen: string,
  check: boolean,
  checkmate: boolean,
  comment: string | null,
  highlights: Highlight[]
  arrows: Arrow[]
}

interface Move {
  player: Player,
  from: Square,
  to: Square,
  piece: Piece,
  algebraic: string,
  capture: boolean,
}

// TODO: Move these constants and helpers into the chess-js.js file.
const CHESS_JS_PIECES: Record<ChessJSPiece, Piece> = {
  p: PAWN,
  n: KNIGHT,
  b: BISHOP,
  r: ROOK,
  q: QUEEN,
  k: KING
};

const CHESS_JS_COLORS: Record<ChessJSColor, Player> = {
  b: BLACK,
  w: WHITE
};

const COMMENT_TAG_REGEX = /\[[^\]]+?\]/g;
const COMMENT_HIGHLIGHT_REGEX = /([a-h][1-8]);keyPressed;(none|ctrl|alt|shift)/g;
const COMMENT_ARROW_REGEX = /([a-h][1-8])([a-h][1-8]);keyPressed;(none|ctrl|alt|shift)/g;

// These colors match the Chess.com defaults.
const HIGHLIGHT_COLORS = {
  "none": "red",
  "alt": "blue",
  "ctrl": "yellow",
  "shift": "green"
};

const ARROW_COLORS = {
  "none": "yellow",
  "alt": "blue",
  "ctrl": "red",
  "shift": "green"
};

function convertChessJSColorToPlayer(chessJsColor: ChessJSColor): Player {
  return CHESS_JS_COLORS[chessJsColor];
}

function convertChessJSPiece(chessJsPiece: ChessJSPiece): Piece {
  return CHESS_JS_PIECES[chessJsPiece];
}

function convertToPosition(fen: string): Position {
  const chess = new Chess(fen);

  return {
    fen: chess.fen(),
    check: chess.inCheck(),
    checkmate: chess.isCheckmate(),
    comment: null,
    highlights: [],
    arrows: []
  };
}

function convertToVerboseMove({ color, from, to, san, piece, flags }: ChessJSMove): Move {
  return {
    player: convertChessJSColorToPlayer(color),
    from: from as Square,
    to: to as Square,
    algebraic: san,
    piece: convertChessJSPiece(piece),
    capture: _.includes(flags, "c") || _.includes(flags, "e")
  };
}

function parseTagHighlights(tag: string | null | undefined) {
  if (!tag) {
    return [];
  }

  const matches = _.compact([ ...tag.matchAll(COMMENT_HIGHLIGHT_REGEX) ])
    .map(([ , square, key ]) => {
      return [ square, key ] as [ Square, "none" | "alt" | "ctrl" | "shift" ];
    });

  return matches.map(([ square, key ]) => {
    return { square, color: HIGHLIGHT_COLORS[key] } as Highlight;
  });
}

function parseTagArrows(tag: string | null | undefined) {
  if (!tag) {
    return [];
  }

  const matches = _.compact([ ...tag.matchAll(COMMENT_ARROW_REGEX) ])
    .map(([ , from, to, key ]) => {
      return [ from, to, key ] as [ Square, Square, "none" | "alt" | "ctrl" | "shift" ];
    });

  return matches.map(([ from, to, key ]) => {
    return { from, to, color: ARROW_COLORS[key] } as Arrow;
  });
}

function parsePGNComment(comment?: string): [string | null, Highlight[], Arrow[]] {
  if (!comment) {
    return [ null, [], [] ];
  }

  // Grab all of the tags from the comment.
  const tags = _.flatten(_.compact([ ...comment.matchAll(COMMENT_TAG_REGEX) ]));

  // Remove the tags from the comment.
  comment = comment.replace(COMMENT_TAG_REGEX, "").trim();

  // Parse the highlights and arrows.
  const highlights = _.flatten(tags.map(tag => parseTagHighlights(tag)));
  const arrows = _.flatten(tags.map(tag => parseTagArrows(tag)));

  return [ comment, highlights, arrows ];
}

/**
 * This is an adapter for chess.js. It provides a more modern interface, it uses the application's
 * moves, and it adds some additional conveniences to the class.
 */
export class Chessboard {

  /**
   * Contains all of the moves that have been made on the chessboard.
   */
  readonly moves!: Move[];

  /**
   * Contains all of the positions for the chess game, including the starting position.
   */
  readonly positions!: Position[];

  /**
   * Creates a new chessboard starting from the given FEN.
   */
  constructor({ startingPosition }: { startingPosition?: string | null } = {}) {
    this.positions = [ convertToPosition(startingPosition || STARTING_POSITION) ];
    this.moves = [];
  }

  /**
   * Returns the starting position of the chessboard.
   */
  get startingPosition(): Position {
    return this.positions[0];
  }

  /**
   * Returns the FEN of the starting position.
   */
  get startingFEN(): string {
    return this.startingPosition.fen;
  }

  /**
   * Returns the last move.
   */
  get lastMove() {
    return _.last(this.moves) || null;
  }

  /**
   * Returns the last position.
   */
  get position() {
    return _.last(this.positions) as Position;
  }

  /**
   * Returns the FEN of the current position, or the starting position if no moves have been made.
   */
  get fen(): string {
    return this.position.fen;
  }

  /**
   * Returns the first player to play from the original FEN.
   */
  get startingPlayer(): Player {
    return startingPlayer(this.startingPosition.fen);
  }

  /**
   * Returns true if the starting player is white.
   */
  get isStartingPlayerWhite(): boolean {
    return this.startingPlayer === WHITE;
  }

  /**
   * Returns true if the starting player is black.
   */
  get isStartingPlayerBlack(): boolean {
    return this.startingPlayer === BLACK;
  }

  /**
   * Returns true if white can castle kingside.
   */
  get whiteCanCastleKingside(): boolean {
    return fenCanCastle(this.startingPosition.fen, WHITE, KINGSIDE);
  }

  /**
   * Returns true if white can castle queenside.
   */
  get whiteCanCastleQueenside(): boolean {
    return fenCanCastle(this.startingPosition.fen, WHITE, QUEENSIDE);
  }

  /**
   * Returns true if black can castle kingside.
   */
  get blackCanCastleKingside(): boolean {
    return fenCanCastle(this.startingPosition.fen, BLACK, KINGSIDE);
  }

  /**
   * Returns true if black can castle kingside.
   */
  get blackCanCastleQueenside(): boolean {
    return fenCanCastle(this.startingPosition.fen, BLACK, QUEENSIDE);
  }

  /**
   * Returns true if the last move was a capture.
   */
  get isCapture(): boolean {
    return !!this.lastMove?.capture;
  }

  /**
   * Returns true if the current position is a check.
   */
  get isCheck(): boolean {
    return this.position.check;
  }

  /**
   * Returns true if the current position is a checkmate.
   */
  get isCheckmate(): boolean {
    return this.position.checkmate;
  }

  /**
   * Returns the player whose turn it is.
   */
  get currentPlayer(): Player {
    return startingPlayer(this.position.fen);
  }

  /**
   * Returns the comment for the current position.
   */
  get comment(): string | null {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return _.last(this.positions)!.comment;
  }

  /**
   * Returns the highlights for the current position.
   */
  get highlights(): Highlight[] {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return _.last(this.positions)!.highlights;
  }

  /**
   * Returns the arrows for the current position.
   */
  get arrows(): Arrow[] {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return _.last(this.positions)!.arrows;
  }

  /**
   * Makes a move on the chessboard.
   */
  move(move: string): boolean {

    // Make the move. We have to attempt to make the move, because that's how we determine if it is
    // valid.
    let moveResult;
    const chess = new Chess(this.position.fen);

    try {
      moveResult = chess.move(move, { sloppy: true });
    }
    catch {
      return false;
    }

    // If the move was not successful, ignore it.
    if (!moveResult) {
      return false;
    }

    // Update the history
    this.moves.push(convertToVerboseMove(moveResult));
    this.positions.push(convertToPosition(chess.fen()));

    // Indicate the move was successful
    return true;
  }

  /**
   * Sets the comment for the current position.
   */
  setComment(comment: string | null) {
    const position = _.last(this.positions) as Position;
    position.comment = comment;
  }

  /**
   * Adds an highlight for the current position.
   */
  addHighlight(highlight: Highlight) {
    const position = _.last(this.positions) as Position;

    // TODO: Ensure highlights are unique.
    position.highlights.push(highlight);
  }

  /**
   * Adds an arrow for the current position.
   */
  addArrow(arrow: Arrow) {
    const position = _.last(this.positions) as Position;

    // TODO: Ensure arrows are unique.
    position.arrows.push(arrow);
  }

  /**
   * Loads the chessboard from a PGN.
   */
  static load(pgn: string): Chessboard {
    if (pgn.trim() === "") {
      return new Chessboard();
    }

    const chess = new Chess();

    if (!chess.loadPgn(pgn, { sloppy: true })) {
      throw new Error("The PGN is invalid!");
    }

    const reversedHistory: [ move: string, comment: string ][] = [];

    while (chess.history().length > 0) {
      const comment = chess.getComment();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const move = chess.undo()!.san;
      reversedHistory.push([ move, comment ]);
    }

    const chessboard = new Chessboard({ startingPosition: chess.header().FEN });

    reversedHistory.reverse().forEach(([ move, comment ]) => {
      if (!chessboard.move(move)) {
        throw new Error("The PGN is invalid!");
      }

      const [ parsedComment, highlights, arrows ] = parsePGNComment(comment);

      chessboard.setComment(parsedComment);
      highlights.forEach(highlight => chessboard.addHighlight(highlight));
      arrows.forEach(arrow => chessboard.addArrow(arrow));
    });

    return chessboard;
  }
}

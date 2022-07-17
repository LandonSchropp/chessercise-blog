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
import { Piece, Player, Square } from "../types";
import {
  fenCanCastle,
  setFenCanCastle,
  setFenStartingPlayer,
  startingPlayer } from "./fen";
import { indicesToSquare, reverseYIndex } from "./squares";

type Move = {
  player: Player,
  from: Square,
  to: Square,
  algebraic: string,
  piece: Piece,
  capture: boolean,
  fen: string,
  check: boolean,
  checkmate: boolean
}

type VerbosePiece = {
  piece: Piece,
  player: Player,
  square: Square
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

const CHESS_JS_PIECES_INVERTED = _.invert(CHESS_JS_PIECES) as Record<Piece, ChessJSPiece>;
const CHESS_JS_COLORS_INVERTED = _.invert(CHESS_JS_COLORS)as Record<Player, ChessJSColor>;

function convertChessJSColorToPlayer(chessJsColor: ChessJSColor): Player {
  return CHESS_JS_COLORS[chessJsColor];
}

function convertChessJSPiece(chessJsPiece: ChessJSPiece): Piece {
  return CHESS_JS_PIECES[chessJsPiece];
}

function convertPlayerToChessJSColor(player: Player): ChessJSColor {
  return CHESS_JS_COLORS_INVERTED[player];
}

function convertPieceToChessJSType(piece: Piece): ChessJSPiece {
  return CHESS_JS_PIECES_INVERTED[piece];
}

function convertToVerboseMove(
  chess: Chess,
  { color, from, to, san, piece, flags }: ChessJSMove
): Move {
  return {
    player: convertChessJSColorToPlayer(color),
    from: from as Square,
    to: to as Square,
    algebraic: san,
    piece: convertChessJSPiece(piece),
    capture: _.includes(flags, "c") || _.includes(flags, "e"),
    fen: chess.fen(),
    check: chess.inCheck(),
    checkmate: chess.isCheckmate()
  };
}

/**
 * This is an adapter for chess.js. It provides a more modern interface, it uses the application's
 * moves, and it adds some additional conveniences to the class.
 */
export class Chessboard {
  private _startingPosition: string = STARTING_POSITION;
  private _chess!: Chess;
  private _history!: Move[];

  /**
   * Creates a new chessboard starting from the given starting position.
   */
  constructor({ startingPosition }: { startingPosition?: string | null } = {}) {
    this.startingPosition = startingPosition || STARTING_POSITION;
    this.reset();
  }

  /**
   * Contains a verbose history of all of the moves made in the chessboard.
   */
  get history() {
    return this._history;
  }

  /**
   * Returns the starting position of the chessboard.
   */
  get startingPosition(): string {
    return this._startingPosition;
  }

  /**
   * Sets the starting position of the chessboard.
   */
  set startingPosition(startingPosition: string | null | undefined) {
    this._startingPosition = startingPosition || STARTING_POSITION;
    this.reset();
  }

  /**
   * Returns the FEN of the current position, or the starting position if no moves have been made.
   */
  get fen(): string {
    return this.lastMove?.fen || this.startingPosition;
  }

  /**
   * Returns the first player to play from the original FEN.
   */
  get startingPlayer(): Player {
    return startingPlayer(this.startingPosition);
  }

  /**
   * Sets the starting player.
   */
  set startingPlayer(player) {
    this.startingPosition = setFenStartingPlayer(this.startingPosition, player);
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
    return fenCanCastle(this.startingPosition, WHITE, KINGSIDE);
  }

  /**
   * Sets whether white can castle kingside.
   */
  set whiteCanCastleKingside(canCastle) {
    this.startingPosition = setFenCanCastle(this.startingPosition, WHITE, KINGSIDE, canCastle);
  }

  /**
   * Returns true if white can castle queenside.
   */
  get whiteCanCastleQueenside(): boolean {
    return fenCanCastle(this.startingPosition, WHITE, QUEENSIDE);
  }

  /**
   * Sets whether white can castle queenside.
   */
  set whiteCanCastleQueenside(canCastle) {
    this.startingPosition = setFenCanCastle(this.startingPosition, WHITE, QUEENSIDE, canCastle);
  }

  /**
   * Returns true if black can castle kingside.
   */
  get blackCanCastleKingside(): boolean {
    return fenCanCastle(this.startingPosition, BLACK, KINGSIDE);
  }

  /**
   * Sets whether black can castle kingside.
   */
  set blackCanCastleKingside(canCastle: boolean) {
    this.startingPosition = setFenCanCastle(this.startingPosition, BLACK, KINGSIDE, canCastle);
  }

  /**
   * Returns true if black can castle kingside.
   */
  get blackCanCastleQueenside(): boolean {
    return fenCanCastle(this.startingPosition, BLACK, QUEENSIDE);
  }

  /**
   * Sets whether black can castle queenside.
   */
  set blackCanCastleQueenside(canCastle: boolean) {
    this.startingPosition = setFenCanCastle(this.startingPosition, BLACK, QUEENSIDE, canCastle);
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
    return this._chess.isCheck();
  }

  /**
   * Returns true if the current position is a checkmate.
   */
  get isCheckmate(): boolean {
    return this._chess.isCheckmate();
  }

  /**
   * Returns the player whose turn it is.
   */
  get currentPlayer(): Player {
    if (!this.lastMove) {
      return this.startingPlayer;
    }

    return this.lastMove.player === WHITE ? BLACK : WHITE;
  }

  /**
   * Returns a 2D array of all of the pieces on the board.
  */
  get pieces(): VerbosePiece[] {

    const result = _.flatMap(this._chess.board(), (rank, rankIndex) => {
      return _.map(rank, (piece, fileIndex) => {

        if (_.isNil(piece)) {
          return null;
        }

        return {
          piece: convertChessJSPiece(piece.type),
          player: convertChessJSColorToPlayer(piece.color),
          square: indicesToSquare(reverseYIndex([ fileIndex, rankIndex ]))
        };
      });

    });

    return _.compact(result);
  }

  /**
   * Returns an array of the legal moves from the current position.
   */
  legalMoves(square: Square): Square[] {
    const moves = this._chess.moves({ verbose: true, square }) as ChessJSMove[];
    return moves.map((move) => move.to as Square);
  }

  /**
   * Makes a move on the chessboard.
   */
  move(move: string): boolean {

    // Make the move. We have to attempt to make the move, because that's how we determine if it is
    // valid.
    let result;

    try {
      result = this._chess.move(move, { sloppy: true });
    }
    catch {
      return false;
    }

    // If the move was not successful, ignore it.
    if (!result) {
      return false;
    }

    // Update the history
    this.history.push(convertToVerboseMove(this._chess, result));

    // Indicate the move was successful
    return true;
  }

  /**
   * Undoes the last move.
   */
  undo(): void {
    if (this.history.length === 0) {
      throw new Error("Can't undo because no moves have been made.");
    }

    this._chess.undo();
    this.history.pop();
  }

  /**
   * Resets the chessboard to its starting position.
   */
  reset(): void {
    this._chess = new Chess(this.startingPosition);
    this._history = [] as Move[];
  }

  /**
   * Adds a piece to the board's starting position.
   */
  addPieceToStartingPosition(square: Square, player: Player, piece: Piece): void {
    const data = {
      type: convertPieceToChessJSType(piece),
      color: convertPlayerToChessJSColor(player)
    };

    this._chess.put(data, square);
    this.startingPosition = this._chess.fen();
  }

  /**
   * Removes a piece from the board's starting position.
   */
  removePieceFromStartingPosition(square: Square): void {
    this._chess.remove(square);
    this.startingPosition = this._chess.fen();
  }

  /**
   * Moves a piece in the starting position.
   */
  movePieceInStartingPosition(from: Square, to: Square): void {
    const fromPiece = _.find(this.pieces, ({ square }) => square === from);

    if (_.isNil(fromPiece)) {
      throw new Error(`There is no piece on the square '${ from }'`);
    }

    this.removePieceFromStartingPosition(from);
    this.addPieceToStartingPosition(to, fromPiece.player, fromPiece.piece);
  }

  /**
   * Returns true if the chessboard has the given piece.
   */
  hasPiece(player: Player, piece: Piece) {
    const result = _.find(this.pieces, ({ piece: includedPiece, player: includedPlayer }) => {
      return includedPiece === piece && includedPlayer === player;
    });

    return !_.isNil(result);
  }

  /**
   * Returns the last move in the history.
   */
  private get lastMove() {
    return _.last(this.history) || null;
  }
}

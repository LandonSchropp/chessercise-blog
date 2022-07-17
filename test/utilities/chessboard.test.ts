import {
  BLACK,
  EMPTY_POSITION,
  KING,
  PAWN,
  QUEEN,
  STARTING_POSITION,
  WHITE
} from "../../src/constants";
import { Chessboard } from "../../src/utilities/chessboard";
import {
  BEFORE_CAPTURE_POSITION,
  BEFORE_CHECK_POSITION,
  BEFORE_CHECKMATE_POSITION,
  BEFORE_PROMOTION_POSITION,
  CAPTURE_POSITION,
  CHECK_POSITION,
  CHECKMATE_POSITION,
  ITALIAN_MOVES,
  ITALIAN_POSITION,
  KINGS_PAWN_OPENING,
  PROMOTION_POSITION
} from "../test-constants";

describe("Chessboard", () => {
  let chessboard: Chessboard;

  beforeEach(() => chessboard = new Chessboard());

  describe("#constructor", () => {

    describe("when no parameters are provided", () => {

      it("sets the starting position to the default starting position", () => {
        expect(chessboard.startingPosition).toEqual(STARTING_POSITION);
      });

      it("sets the history to an empty array", () => {
        expect(chessboard.history).toEqual([]);
      });
    });

    describe("when an empty object is provided", () => {
      beforeEach(() => chessboard = new Chessboard({}));

      it("sets the starting position to the default starting position", () => {
        expect(chessboard.startingPosition).toEqual(STARTING_POSITION);
      });

      it("sets the history to an empty array", () => {
        expect(chessboard.history).toEqual([]);
      });
    });

    describe("when a null starting position is provided", () => {
      beforeEach(() => chessboard = new Chessboard({ startingPosition: null }));

      it("sets the starting position to the default starting position", () => {
        expect(chessboard.startingPosition).toEqual(STARTING_POSITION);
      });

      it("sets the history to an empty array", () => {
        expect(chessboard.history).toEqual([]);
      });
    });

    describe("when a starting position is provided", () => {
      beforeEach(() => chessboard = new Chessboard({ startingPosition: EMPTY_POSITION }));

      it("sets the starting position to the provided starting position", () => {
        expect(chessboard.startingPosition).toEqual(EMPTY_POSITION);
      });

      it("sets the history to an empty array", () => {
        expect(chessboard.history).toEqual([]);
      });
    });
  });

  describe("#startingPosition", () => {
    beforeEach(() => chessboard.startingPosition = ITALIAN_POSITION);

    it("returns the starting position", () => {
      expect(chessboard.startingPosition).toEqual(ITALIAN_POSITION);
    });
  });

  describe("#startingPosition=", () => {
    describe("when the starting position is not null", () => {
      beforeEach(() => chessboard.startingPosition = ITALIAN_POSITION);

      it("sets the starting position", () => {
        expect(chessboard.startingPosition).toEqual(ITALIAN_POSITION);
      });
    });

    describe("when the starting position is null", () => {
      beforeEach(() => chessboard.startingPosition = null);

      it("sets the starting position to the default position", () => {
        expect(chessboard.startingPosition).toEqual(STARTING_POSITION);
      });
    });

    describe("when the chessboard has moves", () => {
      beforeEach(() => {
        ITALIAN_MOVES.forEach(move => chessboard.move(move));
        chessboard.startingPosition = KINGS_PAWN_OPENING;
      });

      it("sets the starting position", () => {
        expect(chessboard.startingPosition).toEqual(KINGS_PAWN_OPENING);
      });

      it("clears the history", () => {
        expect(chessboard.history).toEqual([]);
      });
    });

  });

  describe("#move", () => {

    describe("when the move is standard algebraic notation and is valid", () => {

      it("returns true", () => {
        ITALIAN_MOVES.forEach(move => {
          expect(chessboard.move(move)).toEqual(true);
        });
      });

      it("makes the move on the board", () => {
        ITALIAN_MOVES.forEach(move => chessboard.move(move));
        expect(chessboard.fen).toEqual(ITALIAN_POSITION);
      });
    });

    describe("when the move is a valid promotion", () => {
      beforeEach(() => chessboard.startingPosition = BEFORE_PROMOTION_POSITION);

      it("returns true", () => {
        expect(chessboard.move("a8=Q")).toEqual(true);
      });

      it("makes the move on the board", () => {
        chessboard.move("a8=Q");
        expect(chessboard.fen).toEqual(PROMOTION_POSITION);
      });
    });

    describe("when the move is standard algebraic notation but is not valid", () => {

      it("returns false", () => {
        expect(chessboard.move("e5")).toEqual(false);
      });

      it("does not make the move on the board", () => {
        chessboard.move("e5");
        expect(chessboard.fen).toEqual(STARTING_POSITION);
      });
    });

    describe("when the move is not standard algebraic notation", () => {

      it("returns false", () => {
        expect(chessboard.move("banana")).toEqual(false);
      });

      it("does not make the move on the board", () => {
        chessboard.move("banana");
        expect(chessboard.fen).toEqual(STARTING_POSITION);
      });
    });
  });

  describe("#history", () => {

    describe("when the board has no moves", () => {

      it("returns an empty array", () => {
        expect(chessboard.history).toEqual([]);
      });
    });

    describe("when the board has one move", () => {
      beforeEach(() => chessboard.move(ITALIAN_MOVES[0]));

      it("includes the move in the history", () => {
        expect(chessboard.history).toHaveLength(1);
      });

      it("includes the player", () => {
        expect(chessboard.history[0].player).toEqual(WHITE);
      });

      it("includes the from square", () => {
        expect(chessboard.history[0].from).toEqual("e2");
      });

      it("includes the to square", () => {
        expect(chessboard.history[0].to).toEqual("e4");
      });

      it("includes the algebraic notation of the move", () => {
        expect(chessboard.history[0].algebraic).toEqual("e4");
      });

      it("includes the piece", () => {
        expect(chessboard.history[0].piece).toEqual(PAWN);
      });

      it("includes whether the move was a capture or not", () => {
        expect(chessboard.history[0].capture).toEqual(false);
      });

      it("includes whether the move was a check or not", () => {
        expect(chessboard.history[0].check).toEqual(false);
      });

      it("includes whether the move was a checkmate or not", () => {
        expect(chessboard.history[0].checkmate).toEqual(false);
      });

      it("includes the FEN after the move", () => {
        expect(chessboard.history[0].fen).toEqual(KINGS_PAWN_OPENING);
      });

      describe("when the move is a capture", () => {
        beforeEach(() => {
          chessboard = new Chessboard({ startingPosition: BEFORE_CAPTURE_POSITION });
          chessboard.move("Rxg4");
        });

        it("returns true for capture", () => {
          expect(chessboard.history[0].capture).toEqual(true);
        });

        it("returns the correct algebraic notation", () => {
          expect(chessboard.history[0].algebraic).toEqual("Rxg4");
        });

        it("returns the correct FEN", () => {
          expect(chessboard.history[0].fen).toEqual(CAPTURE_POSITION);
        });
      });

      describe("when the move is a check", () => {
        beforeEach(() => {
          chessboard = new Chessboard({ startingPosition: BEFORE_CHECK_POSITION });
          chessboard.move("Qxe5");
        });

        it("returns true for check", () => {
          expect(chessboard.history[0].check).toEqual(true);
        });

        it("returns false for checkmate", () => {
          expect(chessboard.history[0].checkmate).toEqual(false);
        });

        it("returns the correct algebraic notation", () => {
          expect(chessboard.history[0].algebraic).toEqual("Qxe5+");
        });

        it("returns the correct FEN", () => {
          expect(chessboard.history[0].fen).toEqual(CHECK_POSITION);
        });
      });

      describe("when the move is a checkmate", () => {
        beforeEach(() => {
          chessboard = new Chessboard({ startingPosition: BEFORE_CHECKMATE_POSITION });
          chessboard.move("Qe7");
        });

        it("returns true for check", () => {
          expect(chessboard.history[0].check).toEqual(true);
        });

        it("returns true for checkmate", () => {
          expect(chessboard.history[0].checkmate).toEqual(true);
        });

        it("returns the correct algebraic notation", () => {
          expect(chessboard.history[0].algebraic).toEqual("Qe7#");
        });

        it("returns the correct FEN", () => {
          expect(chessboard.history[0].fen).toEqual(CHECKMATE_POSITION);
        });
      });
    });
  });

  describe("#fen", () => {

    describe("when the chessboard does not have any moves", () => {

      it("returns the starting position", () => {
        expect(chessboard.fen).toEqual(STARTING_POSITION);
      });
    });

    describe("when the chessboard has moves", () => {

      it("returns the FEN for the current position", () => {
        ITALIAN_MOVES.forEach(move => chessboard.move(move));
        expect(chessboard.fen).toEqual(ITALIAN_POSITION);
      });
    });
  });

  describe("#startingPlayer", () => {

    describe("when the starting player is white", () => {

      it("returns white", () => {
        expect(chessboard.startingPlayer).toEqual(WHITE);
      });
    });

    describe("when the starting player is black", () => {
      beforeEach(() => chessboard = new Chessboard({ startingPosition: KINGS_PAWN_OPENING }));

      it("returns black", () => {
        expect(chessboard.startingPlayer).toEqual(BLACK);
      });
    });
  });

  describe("#startingPlayer=", () => {
    beforeEach(() => chessboard.startingPlayer = BLACK);

    it("sets the starting player", () => {
      expect(chessboard.startingPlayer).toEqual(BLACK);
    });

    it("updates the FEN", () => {
      expect(chessboard.fen).toEqual("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 0 1");
    });
  });

  describe("#isStartingPlayerWhite", () => {

    describe("when the starting player is white", () => {

      it("returns true", () => {
        expect(chessboard.isStartingPlayerWhite).toEqual(true);
      });
    });

    describe("when the current player is black", () => {
      beforeEach(() => chessboard.startingPosition = KINGS_PAWN_OPENING);

      it("returns false", () => {
        expect(chessboard.isStartingPlayerWhite).toEqual(false);
      });
    });
  });

  describe("#isStartingPlayerBlack", () => {

    describe("when the starting player is black", () => {
      beforeEach(() => chessboard.startingPosition = KINGS_PAWN_OPENING);

      it("returns true", () => {
        expect(chessboard.isStartingPlayerBlack).toEqual(true);
      });
    });

    describe("when the current player is white", () => {

      it("returns false", () => {
        expect(chessboard.isStartingPlayerBlack).toEqual(false);
      });
    });
  });

  describe("#whiteCanCastleKingside=", () => {
    beforeEach(() => chessboard.whiteCanCastleKingside = false);

    it("sets whether white can castle kingside", () => {
      expect(chessboard.whiteCanCastleKingside).toEqual(false);
    });

    it("updates the FEN", () => {
      expect(chessboard.fen).toEqual("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w Qkq - 0 1");
    });
  });

  describe("#whiteCanCastleQueenside=", () => {
    beforeEach(() => chessboard.whiteCanCastleQueenside = false);

    it("sets whether white can castle queenside", () => {
      expect(chessboard.whiteCanCastleQueenside).toEqual(false);
    });

    it("updates the FEN", () => {
      expect(chessboard.fen).toEqual("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w Kkq - 0 1");
    });
  });

  describe("#blackCanCastleKingside=", () => {
    beforeEach(() => chessboard.blackCanCastleKingside = false);

    it("sets whether black can castle kingside", () => {
      expect(chessboard.blackCanCastleKingside).toEqual(false);
    });

    it("updates the FEN", () => {
      expect(chessboard.fen).toEqual("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQq - 0 1");
    });
  });

  describe("#blackCanCastleQueenside=", () => {
    beforeEach(() => chessboard.blackCanCastleQueenside = false);

    it("sets whether black can castle queenside", () => {
      expect(chessboard.blackCanCastleQueenside).toEqual(false);
    });

    it("updates the FEN", () => {
      expect(chessboard.fen).toEqual("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQk - 0 1");
    });
  });

  describe("#isCapture", () => {

    describe("when no moves have been made", () => {

      it("returns false", () => {
        expect(chessboard.isCapture).toEqual(false);
      });
    });

    describe("when the last move was not a capture", () => {
      beforeEach(() => chessboard.move(ITALIAN_MOVES[0]));

      it("returns false", () => {
        expect(chessboard.isCapture).toEqual(false);
      });
    });

    describe("when the last move was a capture", () => {
      beforeEach(() => {
        chessboard = new Chessboard({ startingPosition: BEFORE_CAPTURE_POSITION });
        chessboard.move("Rxg4");
      });

      it("returns true", () => {
        expect(chessboard.isCapture).toEqual(true);
      });
    });
  });

  describe("#isCheck", () => {

    describe("when the position is not a check", () => {

      it("returns false", () => {
        expect(chessboard.isCheck).toEqual(false);
      });
    });

    describe("when the position is a check", () => {
      beforeEach(() => chessboard.startingPosition = CHECK_POSITION);

      it("returns true", () => {
        expect(chessboard.isCheck).toEqual(true);
      });
    });

    describe("when the position is a checkmate", () => {
      beforeEach(() => chessboard.startingPosition = CHECKMATE_POSITION);

      it("returns true", () => {
        expect(chessboard.isCheck).toEqual(true);
      });
    });
  });

  describe("#isCheckmate", () => {

    describe("when the position is not a check", () => {

      it("returns false", () => {
        expect(chessboard.isCheckmate).toEqual(false);
      });
    });

    describe("when the position is a check", () => {
      beforeEach(() => chessboard.startingPosition = CHECK_POSITION);

      it("returns false", () => {
        expect(chessboard.isCheckmate).toEqual(false);
      });
    });

    describe("when the position is a checkmate", () => {
      beforeEach(() => chessboard.startingPosition = CHECKMATE_POSITION);

      it("returns true", () => {
        expect(chessboard.isCheckmate).toEqual(true);
      });
    });
  });

  describe("#currentPlayer", () => {

    describe("when the starting player is black", () => {
      beforeEach(() => chessboard = new Chessboard({ startingPosition: KINGS_PAWN_OPENING }));

      describe("when no moves have been made", () => {

        it("returns black", () => {
          expect(chessboard.currentPlayer).toEqual(BLACK);
        });
      });

      describe("when an even number of moves have been made", () => {
        beforeEach(() => {
          chessboard.move(ITALIAN_MOVES[1]);
          chessboard.move(ITALIAN_MOVES[2]);
        });

        it("returns black", () => {
          expect(chessboard.currentPlayer).toEqual(BLACK);
        });
      });

      describe("when an odd number of moves have been made", () => {
        beforeEach(() => {
          chessboard.move(ITALIAN_MOVES[1]);
          chessboard.move(ITALIAN_MOVES[2]);
          chessboard.move(ITALIAN_MOVES[3]);
        });

        it("returns white", () => {
          expect(chessboard.currentPlayer).toEqual(WHITE);
        });
      });
    });

    describe("when the starting player is white", () => {

      describe("when no moves have been made", () => {

        it("returns white", () => {
          expect(chessboard.currentPlayer).toEqual(WHITE);
        });
      });

      describe("when an even number of moves have been made", () => {
        beforeEach(() => ITALIAN_MOVES.slice(4).forEach(move => chessboard.move(move)));

        it("returns white", () => {
          expect(chessboard.currentPlayer).toEqual(WHITE);
        });
      });

      describe("when an odd number of moves have been odd", () => {
        beforeEach(() => ITALIAN_MOVES.forEach(move => chessboard.move(move)));

        it("returns black", () => {
          expect(chessboard.currentPlayer).toEqual(BLACK);
        });
      });
    });
  });

  describe("#pieces", () => {

    describe("when the board is empty", () => {
      beforeEach(() => chessboard = new Chessboard({ startingPosition: EMPTY_POSITION }));

      it("returns an empty array", () => {
        expect(chessboard.pieces).toEqual([]);
      });
    });

    describe("when the board is not empty", () => {
      beforeEach(() => chessboard = new Chessboard({ startingPosition: CHECKMATE_POSITION }));

      it("returns an array of all of the pieces on the board", () => {
        expect(chessboard.pieces).toIncludeSameMembers([
          { piece: KING, player: BLACK, square: "e8" },
          { piece: KING, player: WHITE, square: "e6" },
          { piece: QUEEN, player: WHITE, square: "e7" }
        ]);
      });
    });
  });

  describe("#comment", () => {
    beforeEach(() => chessboard.setComment("Hello!"));

    it("returns the comment", () => {
      expect(chessboard.comment).toEqual("Hello!");
    });
  });

  describe("#legalMoves", () => {

    describe("when the piece has no legal moves", () => {

      it("returns an empty array", () => {
        expect(chessboard.legalMoves("e1")).toEqual([]);
      });
    });

    describe("when the piece has legal moves", () => {

      it("returns an arary of the legal moves", () => {
        expect(chessboard.legalMoves("g1")).toIncludeSameMembers([ "f3", "h3" ]);
      });
    });
  });

  describe("#undo", () => {

    describe("when there are no moves to undo", () => {

      it("throws an error", () => {
        expect(() => chessboard.undo()).toThrow();
      });
    });

    describe("when there are moves to undo", () => {
      beforeEach(() => {
        chessboard.move(ITALIAN_MOVES[0]);
        chessboard.move(ITALIAN_MOVES[1]);
      });

      it("rolls back the move", () => {
        chessboard.undo();
        expect(chessboard.fen).toEqual(KINGS_PAWN_OPENING);
        chessboard.undo();
        expect(chessboard.fen).toEqual(STARTING_POSITION);
      });

      it("pops the last item off the history", () => {
        chessboard.undo();
        expect(chessboard.fen).toEqual(KINGS_PAWN_OPENING);
        chessboard.undo();
        expect(chessboard.fen).toEqual(STARTING_POSITION);
      });
    });
  });

  describe("#reset", () => {

    describe("when the board is already in the starting position", () => {
      beforeEach(() => chessboard.reset());

      it("doesn't do anything", () => {
        expect(chessboard.fen).toEqual(STARTING_POSITION);
      });
    });

    describe("when the board is not in the starting position", () => {
      beforeEach(() => {
        ITALIAN_MOVES.forEach(move => chessboard.move(move));
        chessboard.reset();
      });

      it("resets the board to the starting position", () => {
        expect(chessboard.fen).toEqual(STARTING_POSITION);
      });
    });

    // FIX: This test is reproducing a bug.
    describe("when the starting position is not the default FEN", () => {
      beforeEach(() => {
        chessboard.startingPosition = EMPTY_POSITION;
        chessboard.reset();
      });

      it("resets the board to the starting position, not the default FEN", () => {
        expect(chessboard.fen).toEqual(EMPTY_POSITION);
      });
    });
  });

  describe("#addPieceToStartingPosition", () => {

    describe("when a piece is not on the square", () => {
      beforeEach(() => {
        chessboard.startingPosition = EMPTY_POSITION;
        chessboard.addPieceToStartingPosition("f5", BLACK, QUEEN);
      });

      it("places a piece on the square", () => {
        expect(chessboard.pieces).toEqual([ { player: BLACK, piece: QUEEN, square: "f5" } ]);
      });

      it("updates the starting position", () => {
        expect(chessboard.startingPosition).toEqual("8/8/8/5q2/8/8/8/8 w KQkq - 0 1");
      });
    });

    describe("when a piece is already on the square", () => {
      beforeEach(() => {
        chessboard.startingPosition = EMPTY_POSITION;
        chessboard.addPieceToStartingPosition("f5", BLACK, QUEEN);
        chessboard.addPieceToStartingPosition("f5", WHITE, QUEEN);
      });

      it("replaces a piece on the square", () => {
        expect(chessboard.pieces).toEqual([ { player: WHITE, piece: QUEEN, square: "f5" } ]);
      });

      it("updates the starting position", () => {
        expect(chessboard.startingPosition).toEqual("8/8/8/5Q2/8/8/8/8 w KQkq - 0 1");
      });
    });
  });

  describe("#removePieceFromStartingPosition", () => {

    describe("when a piece is not on the square", () => {
      beforeEach(() => {
        chessboard.startingPosition = EMPTY_POSITION;
        chessboard.removePieceFromStartingPosition("f5");
      });

      it("does nothing", () => {
        expect(chessboard.pieces).toEqual([]);
      });

      it("does not update the starting position", () => {
        expect(chessboard.startingPosition).toEqual(EMPTY_POSITION);
      });
    });

    describe("when a piece is already on the square", () => {
      beforeEach(() => {
        chessboard.startingPosition = EMPTY_POSITION;
        chessboard.addPieceToStartingPosition("f5", BLACK, QUEEN);
        chessboard.removePieceFromStartingPosition("f5");
      });

      it("removes the piece from the board", () => {
        expect(chessboard.pieces).toEqual([]);
      });

      it("updates the starting position", () => {
        expect(chessboard.startingPosition).toEqual(EMPTY_POSITION);
      });
    });
  });

  describe("#movePieceInStartingPosition", () => {
    beforeEach(() => {
      chessboard.startingPosition = EMPTY_POSITION;
      chessboard.addPieceToStartingPosition("f5", BLACK, QUEEN);
      chessboard.addPieceToStartingPosition("h4", WHITE, QUEEN);
    });

    describe("when there is not piece on the from square", () => {

      it("throws an error", () => {
        expect(() => chessboard.movePieceInStartingPosition("b5", "c4")).toThrow();
      });
    });

    describe("when there is no piece on the to square", () => {
      beforeEach(() => chessboard.movePieceInStartingPosition("f5", "f1"));

      it("removes the piece from the from square", () => {
        expect(chessboard.pieces).not.toContainEqual({ piece: QUEEN, player: BLACK, square: "f5" });
      });

      it("places the piece on the to square", () => {
        expect(chessboard.pieces).toContainEqual({ piece: QUEEN, player: BLACK, square: "f1" });
      });

      it("still contains the other piece", () => {
        expect(chessboard.pieces).toContainEqual({ piece: QUEEN, player: WHITE, square: "h4" });
      });

      it("updates the starting position", () => {
        expect(chessboard.startingPosition).toEqual("8/8/8/8/7Q/8/8/5q2 w KQkq - 0 1");
      });
    });

    describe("when there is a piece on the to square", () => {
      beforeEach(() => chessboard.movePieceInStartingPosition("f5", "h4"));

      it("removes the piece from the from square", () => {
        expect(chessboard.pieces).not.toContainEqual({ piece: QUEEN, player: BLACK, square: "f5" });
      });

      it("places the piece on the to square", () => {
        expect(chessboard.pieces).toContainEqual({ piece: QUEEN, player: BLACK, square: "h4" });
      });

      it("removes the other piece", () => {
        expect(chessboard.pieces).not.toContainEqual({ piece: QUEEN, player: WHITE, square: "h4" });
      });

      it("updates the starting position", () => {
        expect(chessboard.startingPosition).toEqual("8/8/8/8/7q/8/8/8 w KQkq - 0 1");
      });
    });
  });

  describe("#hasPiece", () => {

    describe("when the chessboard has the piece", () => {

      it("returns true", () => {
        expect(chessboard.hasPiece(BLACK, QUEEN)).toEqual(true);
      });
    });

    describe("when the chessboard does not have the piece", () => {
      beforeEach(() => chessboard.startingPosition = EMPTY_POSITION);

      it("returns false", () => {
        expect(chessboard.hasPiece(BLACK, QUEEN)).toEqual(false);
      });
    });
  });

  describe("#load", () => {

    describe("when the PGN is empty", () => {
      beforeEach(() => chessboard = Chessboard.load(""));

      it("uses the starting position", () => {
        expect(chessboard.startingPosition).toEqual(STARTING_POSITION);
      });

      it("has an empty history", () => {
        expect(chessboard.history).toEqual([]);
      });
    });

    describe("when the PGN only contains headers", () => {
      beforeEach(() => chessboard = Chessboard.load(`
        [Event "Example"]
        [Date "2022.07.16"]

        *
      `));

      it("uses the starting position", () => {
        expect(chessboard.startingPosition).toEqual(STARTING_POSITION);
      });

      it("has an empty history", () => {
        expect(chessboard.history).toEqual([]);
      });
    });

    describe("when the PGN contains no moves or a position", () => {
      beforeEach(() => {
        return chessboard = Chessboard.load("*");
      });

      it("uses the starting position", () => {
        expect(chessboard.startingPosition).toEqual(STARTING_POSITION);
      });

      it("has an empty history", () => {
        expect(chessboard.history).toEqual([]);
      });
    });

    describe("when the PGN contains moves without a position", () => {
      beforeEach(() => {
        return chessboard = Chessboard.load("1. e4 e5 2. Nf3 Nc6 3. Bc4");
      });

      it("uses the starting position", () => {
        expect(chessboard.startingPosition).toEqual(STARTING_POSITION);
      });

      it("loads the moves", () => {
        expect(chessboard.history.map(move => move.algebraic)).toEqual(ITALIAN_MOVES);
      });
    });

    describe("when the PGN contains no moves with a custom position", () => {
      beforeEach(() => {
        return chessboard = Chessboard.load(`[FEN "${ BEFORE_CHECKMATE_POSITION }"]\n\n*`);
      });

      it("uses the custom position", () => {
        expect(chessboard.startingPosition).toEqual(BEFORE_CHECKMATE_POSITION);
      });

      it("has an empty history", () => {
        expect(chessboard.history).toEqual([]);
      });
    });

    describe("when the PGN contains moves with a custom position", () => {
      beforeEach(() => {
        return chessboard = Chessboard.load(`[FEN "${ BEFORE_CHECKMATE_POSITION }"]\n\n1. Qe7#`);
      });

      it("uses the custom position", () => {
        expect(chessboard.startingPosition).toEqual(BEFORE_CHECKMATE_POSITION);
      });

      it("loads the moves", () => {
        expect(chessboard.history.map(move => move.algebraic)).toEqual([ "Qe7#" ]);
      });
    });

    describe("when the PGN contains comments", () => {

      describe("when the comment does not contain an escape sequence", () => {

        beforeEach(() => {
          chessboard = Chessboard.load("1. e4 {Hello $1} *");
        });

        it("returns the comment unmodified", () => {
          expect(chessboard.comment).toEqual("Hello!");
        });
      });

      describe("when the comment contains an escape sequence", () => {

        it("removes the escape sequence", () => {
          expect(chessboard.comment).toEqual("Hello!");
        });
      });

      describe("when the comment contains highlights", () => {

        it("sets the highlights");
      });

      describe("when the comment contains arrows", () => {

        it("sets the arrows");
      });
    });

    describe("when the PGN is not valid", () => {
      it("throws an error", () => {
        expect(() => Chessboard.load("banana")).toThrow();
      });
    });

    describe("when the PGN contains invalid moves", () => {
      it("throws an error", () => {
        expect(() => Chessboard.load("1. e5")).toThrow();
      });
    });
  });
});

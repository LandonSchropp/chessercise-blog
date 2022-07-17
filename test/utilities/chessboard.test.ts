import { Chess } from "chess.js/src/chess";

import {
  BISHOP,
  BLACK,
  EMPTY_POSITION,
  KING,
  KNIGHT,
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
  E4_E5_OPENING,
  ITALIAN_MOVES,
  ITALIAN_POSITION,
  KINGS_KNIGHT_NC6_OPENING,
  KINGS_KNIGHT_OPENING,
  KINGS_PAWN_OPENING,
  PROMOTION_POSITION } from "../test-constants";

describe("Chessboard", () => {
  let chessboard: Chessboard;

  beforeEach(() => chessboard = new Chessboard());

  describe("#constructor", () => {

    describe("when no parameters are provided", () => {

      it("sets the starting position to the default starting position", () => {
        expect(chessboard.startingFEN).toEqual(STARTING_POSITION);
      });

      it("sets the moves to an empty array", () => {
        expect(chessboard.moves).toEqual([]);
      });

      it("adds the starting position to the positions", () => {
        expect(chessboard.positions).toEqual([
          {
            fen: STARTING_POSITION,
            check: false,
            checkmate: false,
            comment: null,
            highlights: [],
            arrows: []
          }
        ]);
      });
    });

    describe("when an empty object is provided", () => {
      beforeEach(() => chessboard = new Chessboard({}));

      it("sets the starting position to the default starting position", () => {
        expect(chessboard.startingFEN).toEqual(STARTING_POSITION);
      });

      it("sets the moves to an empty array", () => {
        expect(chessboard.moves).toEqual([]);
      });

      it("adds the starting position to the positions", () => {
        expect(chessboard.positions).toEqual([
          {
            fen: STARTING_POSITION,
            check: false,
            checkmate: false,
            comment: null,
            highlights: [],
            arrows: []
          }
        ]);
      });
    });

    describe("when a null starting position is provided", () => {
      beforeEach(() => chessboard = new Chessboard({ startingPosition: null }));

      it("sets the starting position to the default starting position", () => {
        expect(chessboard.startingFEN).toEqual(STARTING_POSITION);
      });

      it("sets the moves to an empty array", () => {
        expect(chessboard.moves).toEqual([]);
      });

      it("adds the starting position to the positions", () => {
        expect(chessboard.positions).toEqual([
          {
            fen: STARTING_POSITION,
            check: false,
            checkmate: false,
            comment: null,
            highlights: [],
            arrows: []
          }
        ]);
      });
    });

    describe("when a starting position is provided", () => {
      beforeEach(() => chessboard = new Chessboard({ startingPosition: EMPTY_POSITION }));

      it("sets the starting position to the provided starting position", () => {
        expect(chessboard.startingFEN).toEqual(EMPTY_POSITION);
      });

      it("sets the moves to an empty array", () => {
        expect(chessboard.moves).toEqual([]);
      });

      it("adds the starting position to the positions", () => {
        expect(chessboard.positions).toEqual([
          {
            fen: EMPTY_POSITION,
            check: false,
            checkmate: false,
            comment: null,
            highlights: [],
            arrows: []
          }
        ]);
      });
    });
  });

  describe("#startingPosition", () => {
    beforeEach(() => chessboard = new Chessboard({ startingPosition: ITALIAN_POSITION }));

    it("returns the starting position", () => {
      expect(chessboard.startingPosition).toEqual({
        fen: ITALIAN_POSITION,
        check: false,
        checkmate: false,
        comment: null,
        highlights: [],
        arrows: []
      });
    });
  });

  describe("startingFEN", () => {
    beforeEach(() => chessboard = new Chessboard({ startingPosition: ITALIAN_POSITION }));

    it("returns the starting position's FEN", () => {
      expect(chessboard.startingFEN).toEqual(ITALIAN_POSITION);
    });
  });

  describe("#moves", () => {
    describe("when no moves have been made", () => {
      it("returns an empty array", () => {
        expect(chessboard.moves).toEqual([]);
      });
    });

    describe("when moves have been made", () => {
      beforeEach(() => ITALIAN_MOVES.forEach(move => chessboard.move(move)));

      it("includes the moves' algebraic notation", () => {
        expect(chessboard.moves.map(move => move.algebraic)).toEqual(ITALIAN_MOVES);
      });

      it("includes whether the moves are captures", () => {
        expect(chessboard.moves.map(move => move.capture)).toEqual([
          false,
          false,
          false,
          false,
          false
        ]);
      });

      it("includes the moves' from squares", () => {
        expect(chessboard.moves.map(move => move.from)).toEqual([
          "e2",
          "e7",
          "g1",
          "b8",
          "f1"
        ]);
      });

      it("includes the moves' to squares", () => {
        expect(chessboard.moves.map(move => move.to)).toEqual([
          "e4",
          "e5",
          "f3",
          "c6",
          "c4"
        ]);
      });

      it("includes the moves' pieces", () => {
        expect(chessboard.moves.map(move => move.piece)).toEqual([
          PAWN,
          PAWN,
          KNIGHT,
          KNIGHT,
          BISHOP
        ]);
      });

      it("includes the moves' players", () => {
        expect(chessboard.moves.map(move => move.player)).toEqual([
          WHITE,
          BLACK,
          WHITE,
          BLACK,
          WHITE
        ]);
      });
    });
  });

  describe("#positions", () => {
    describe("when no moves have been made", () => {
      it("returns an array containing the starting position", () => {
        expect(chessboard.positions).toEqual([
          {
            "arrows": [],
            "check": false,
            "checkmate": false,
            "comment": null,
            "fen": STARTING_POSITION,
            "highlights": []
          }
        ]);
      });
    });

    describe("when moves have been made", () => {
      beforeEach(() => ITALIAN_MOVES.forEach(move => chessboard.move(move)));

      it("returns the positions' FENs", () => {
        expect(chessboard.positions.map(position => position.fen)).toEqual([
          STARTING_POSITION,
          KINGS_PAWN_OPENING,
          E4_E5_OPENING,
          KINGS_KNIGHT_OPENING,
          KINGS_KNIGHT_NC6_OPENING,
          ITALIAN_POSITION
        ]);
      });

      it("returns whether the positions are checks", () => {
        expect(chessboard.positions.map(position => position.check)).toEqual([
          false,
          false,
          false,
          false,
          false,
          false
        ]);
      });

      it("returns whether the positions are checkmates", () => {
        expect(chessboard.positions.map(position => position.checkmate)).toEqual([
          false,
          false,
          false,
          false,
          false,
          false
        ]);
      });

      it("returns the positions' comments", () => {
        expect(chessboard.positions.map(position => position.comment)).toEqual([
          null,
          null,
          null,
          null,
          null,
          null
        ]);
      });

      it("returns the positions' highlights", () => {
        expect(chessboard.positions.map(position => position.highlights)).toEqual([
          [],
          [],
          [],
          [],
          [],
          []
        ]);
      });

      it("returns the positions' arrows", () => {
        expect(chessboard.positions.map(position => position.arrows)).toEqual([
          [],
          [],
          [],
          [],
          [],
          []
        ]);
      });
    });
  });

  describe("#lastMove", () => {
    describe("when no moves have been made", () => {
      it("returns null", () => {
        expect(chessboard.lastMove).toEqual(null);
      });
    });

    describe("when moves have been made", () => {
      beforeEach(() => ITALIAN_MOVES.forEach(move => chessboard.move(move)));

      it("returns the last move", () => {
        expect(chessboard.lastMove).toEqual({
          "algebraic": "Bc4",
          "capture": false,
          "from": "f1",
          "piece": BISHOP,
          "player": WHITE,
          "to": "c4"
        });
      });
    });
  });

  describe("position", () => {
    describe("when no moves have been made", () => {
      it("returns the starting position", () => {
        expect(chessboard.position).toEqual({
          "arrows": [],
          "check": false,
          "checkmate": false,
          "comment": null,
          "fen": STARTING_POSITION,
          "highlights": []
        });
      });
    });

    describe("when moves have been made", () => {
      beforeEach(() => ITALIAN_MOVES.forEach(move => chessboard.move(move)));

      it("returns the current position", () => {
        expect(chessboard.position).toEqual({
          "arrows": [],
          "check": false,
          "checkmate": false,
          "comment": null,
          "fen": ITALIAN_POSITION,
          "highlights": []
        });
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

    describe("when the move is a capture", () => {
      beforeEach(() => {
        chessboard = new Chessboard({ startingPosition: BEFORE_CAPTURE_POSITION });
        chessboard.move("Rxg4");
      });

      it("sets the move's capture flag to true", () => {
        expect(chessboard.lastMove?.capture).toEqual(true);
      });

      it("sets the algebraic notation correctly", () => {
        expect(chessboard.lastMove?.algebraic).toEqual("Rxg4");
      });
    });

    describe("when the move is a check", () => {
      beforeEach(() => {
        chessboard = new Chessboard({ startingPosition: BEFORE_CHECK_POSITION });
        chessboard.move("Qxe5");
      });

      it("sets the check flag to true", () => {
        expect(chessboard.position.check).toEqual(true);
      });

      it("sets the checkmate flag to false", () => {
        expect(chessboard.position.checkmate).toEqual(false);
      });

      it("includes the check simple in the algebraic notation", () => {
        expect(chessboard.lastMove?.algebraic).toEqual("Qxe5+");
      });
    });

    describe("when the move is a checkmate", () => {
      beforeEach(() => {
        chessboard = new Chessboard({ startingPosition: BEFORE_CHECKMATE_POSITION });
        chessboard.move("Qe7");
      });

      it("sets the check flag to true", () => {
        expect(chessboard.position.check).toEqual(true);
      });

      it("sets the checkmate flag to true", () => {
        expect(chessboard.position.checkmate).toEqual(true);
      });

      it("includes the checkmate symbol in the algebraic notation", () => {
        expect(chessboard.lastMove?.algebraic).toEqual("Qe7#");
      });
    });

    describe("when the move is a promotion", () => {
      beforeEach(() => {
        chessboard = new Chessboard({ startingPosition: BEFORE_PROMOTION_POSITION });
      });

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

  describe("#isStartingPlayerWhite", () => {

    describe("when the starting player is white", () => {

      it("returns true", () => {
        expect(chessboard.isStartingPlayerWhite).toEqual(true);
      });
    });

    describe("when the current player is black", () => {
      beforeEach(() => chessboard = new Chessboard({ startingPosition: KINGS_PAWN_OPENING }));

      it("returns false", () => {
        expect(chessboard.isStartingPlayerWhite).toEqual(false);
      });
    });
  });

  describe("#isStartingPlayerBlack", () => {

    describe("when the starting player is black", () => {
      beforeEach(() => chessboard = new Chessboard({ startingPosition: KINGS_PAWN_OPENING }));

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

  describe("#whiteCanCastleKingside", () => {
    beforeEach(() => chessboard = new Chessboard({ startingPosition: BEFORE_CHECKMATE_POSITION }));

    it("returns whether white can castle kingside", () => {
      expect(chessboard.whiteCanCastleKingside).toEqual(false);
    });
  });

  describe("#whiteCanCastleQueenside", () => {
    beforeEach(() => chessboard = new Chessboard({ startingPosition: BEFORE_CHECKMATE_POSITION }));

    it("returns whether white can castle queenside", () => {
      expect(chessboard.whiteCanCastleQueenside).toEqual(false);
    });
  });

  describe("#blackCanCastleKingside", () => {
    beforeEach(() => chessboard = new Chessboard({ startingPosition: BEFORE_CHECKMATE_POSITION }));

    it("returns whether black can castle kingside", () => {
      expect(chessboard.blackCanCastleKingside).toEqual(false);
    });
  });

  describe("#blackCanCastleQueenside", () => {
    beforeEach(() => chessboard = new Chessboard({ startingPosition: BEFORE_CHECKMATE_POSITION }));

    it("returns whether black can castle queenside", () => {
      expect(chessboard.blackCanCastleQueenside).toEqual(false);
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
      beforeEach(() => chessboard = new Chessboard({ startingPosition: CHECK_POSITION }));

      it("returns true", () => {
        expect(chessboard.isCheck).toEqual(true);
      });
    });

    describe("when the position is a checkmate", () => {
      beforeEach(() => chessboard = new Chessboard({ startingPosition: CHECKMATE_POSITION }));

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
      beforeEach(() => chessboard = new Chessboard({ startingPosition: CHECK_POSITION }));

      it("returns false", () => {
        expect(chessboard.isCheckmate).toEqual(false);
      });
    });

    describe("when the position is a checkmate", () => {
      beforeEach(() => chessboard = new Chessboard({ startingPosition: CHECKMATE_POSITION }));

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

  describe("#load", () => {

    describe("when the PGN is empty", () => {
      beforeEach(() => chessboard = Chessboard.load(""));

      it("uses the starting position", () => {
        expect(chessboard.startingFEN).toEqual(STARTING_POSITION);
      });

      it("has no moves", () => {
        expect(chessboard.moves).toEqual([]);
      });
    });

    describe("when the PGN only contains headers", () => {
      beforeEach(() => chessboard = Chessboard.load(`
        [Event "Example"]
        [Date "2022.07.16"]

        *
      `));

      it("uses the starting position", () => {
        expect(chessboard.startingFEN).toEqual(STARTING_POSITION);
      });

      it("has no moves", () => {
        expect(chessboard.moves).toEqual([]);
      });
    });

    describe("when the PGN contains no moves or a position", () => {
      beforeEach(() => {
        return chessboard = Chessboard.load("*");
      });

      it("uses the starting position", () => {
        expect(chessboard.startingFEN).toEqual(STARTING_POSITION);
      });

      it("has no moves", () => {
        expect(chessboard.moves).toEqual([]);
      });
    });

    describe("when the PGN contains moves without a position", () => {
      beforeEach(() => {
        return chessboard = Chessboard.load("1. e4 e5 2. Nf3 Nc6 3. Bc4");
      });

      it("uses the starting position", () => {
        expect(chessboard.startingFEN).toEqual(STARTING_POSITION);
      });

      it("loads the moves", () => {
        expect(chessboard.moves.map(move => move.algebraic)).toEqual(ITALIAN_MOVES);
      });
    });

    describe("when the PGN contains no moves with a custom position", () => {
      beforeEach(() => {
        return chessboard = Chessboard.load(`[FEN "${ BEFORE_CHECKMATE_POSITION }"]\n\n*`);
      });

      it("uses the custom position", () => {
        expect(chessboard.startingFEN).toEqual(BEFORE_CHECKMATE_POSITION);
      });

      it("has no moves", () => {
        expect(chessboard.moves).toEqual([]);
      });
    });

    describe("when the PGN contains moves with a custom position", () => {
      beforeEach(() => {
        return chessboard = Chessboard.load(`[FEN "${ BEFORE_CHECKMATE_POSITION }"]\n\n1. Qe7#`);
      });

      it("uses the custom position", () => {
        expect(chessboard.startingFEN).toEqual(BEFORE_CHECKMATE_POSITION);
      });

      it("loads the moves", () => {
        expect(chessboard.moves.map(move => move.algebraic)).toEqual([ "Qe7#" ]);
      });
    });

    describe("when the PGN contains comments", () => {

      describe("when the comment has no distinguishing factors", () => {
        beforeEach(() => chessboard = Chessboard.load("1. e4 {Hello!} *"));

        it("returns the comment", () => {
          expect(chessboard.comment).toEqual("Hello!");
        });
      });

      describe("when the comment has leading and trailing whitespace", () => {
        beforeEach(() => chessboard = Chessboard.load("1. e4 {  Hello!  } *"));

        it("returns the comment", () => {
          expect(chessboard.comment).toEqual("Hello!");
        });
      });

      describe("when the comment contains special characteers", () => {
        beforeEach(() => chessboard = Chessboard.load("1. e4 {Hello! 👋} *"));

        it("returns the comment", () => {
          expect(chessboard.comment).toEqual("Hello! 👋");
        });
      });

      describe("when the comment contains tag", () => {
        beforeEach(() => chessboard = Chessboard.load("1. e4 {[%clk 0:15:09.9] Hey buddy}"));

        it("removes the escape sequence from the comment", () => {
          expect(chessboard.comment).toEqual("Hey buddy");
        });
      });

      describe("when the comment contains multiple tags", () => {
        beforeEach(() => chessboard = Chessboard.load("1. e4 {[%clk 0:15:09.9][%hey] Hey buddy}"));

        it("removes the escape sequence from the comment", () => {
          expect(chessboard.comment).toEqual("Hey buddy");
        });
      });

      describe("when the comment contains Chess.com highlights", () => {
        beforeEach(() => {
          const pgn = "1. e4 {[%c_highlight "
            + "a1;keyPressed;none;opacity;0.8;square;a1;persistent;false,"
            + "b2;keyPressed;alt;opacity;0.8;square;b2;persistent;false,"
            + "c3;keyPressed;ctrl;opacity;0.8;square;c3;persistent;false,"
            + "d4;keyPressed;shift;opacity;0.8;square;d4;persistent;false"
            + "] Hey buddy}";

          chessboard = Chessboard.load(pgn);
        });

        it("removes the escape sequence from the comment", () => {
          expect(chessboard.comment).toEqual("Hey buddy");
        });

        it.only("sets the highlights", () => {
          expect(chessboard.highlights).toEqual([
            { color: "red", square: "a1" },
            { color: "blue", square: "b2" },
            { color: "yellow", square: "c3" },
            { color: "green", square: "d4" }
          ]);
        });
      });

      describe("when the comment contains arrows", () => {
        beforeEach(() => {
          const pgn = "1. e4 {[%c_arrow"
            + "a1a2;keyPressed;none;from;a1;opacity;0.8;to;a2;persistent;false,"
            + "a1b1;keyPressed;ctrl;from;a1;opacity;0.8;to;b1;persistent;false,"
            + "a1b2;keyPressed;alt;from;a1;opacity;0.8;to;b2;persistent;false,"
            + "a1b3;keyPressed;shift;from;a1;opacity;0.8;to;b3;persistent;false"
            + "] Hey buddy}";

          chessboard = Chessboard.load(pgn);
        });

        it("sets the arrows", () => {
          expect(chessboard.highlights).toEqual([
            { color: "yellow", from: "a1", to: "a2" },
            { color: "blue", from: "a1", to: "b1" },
            { color: "red", from: "a1", to: "b2" },
            { color: "green", from: "a1", to: "b3" }
          ]);
        });
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

import {
  BLACK,
  BLACK_BISHOP,
  BLACK_KING,
  BLACK_KNIGHT,
  BLACK_PAWN,
  BLACK_QUEEN,
  BLACK_ROOK,
  EMPTY_POSITION,
  KINGSIDE,
  QUEENSIDE,
  STARTING_POSITION,
  WHITE,
  WHITE_BISHOP,
  WHITE_KING,
  WHITE_KNIGHT,
  WHITE_PAWN,
  WHITE_QUEEN,
  WHITE_ROOK } from "../../src/constants";
import { NullablePlayerPiece } from "../../src/types";
import {
  fenCanCastle,
  fenPositionsEqual,
  isFenValid,
  parsePosition,
  resizeParsedPosition,
  sanitizeFEN,
  setFenCanCastle,
  setFenStartingPlayer,
  startingPlayer } from "../../src/utilities/fen";
import {
  CAPTURE_POSITION,
  KINGS_PAWN_OPENING
} from "../test-constants";

const PARSED_EMPTY_POSITION = new Array(8).fill(new Array(8).fill(null));

const PARSED_STARTING_POSITION = [
  [
    BLACK_ROOK,
    BLACK_KNIGHT,
    BLACK_BISHOP,
    BLACK_QUEEN,
    BLACK_KING,
    BLACK_BISHOP,
    BLACK_KNIGHT,
    BLACK_ROOK
  ],
  new Array(8).fill(BLACK_PAWN),
  ...PARSED_EMPTY_POSITION.slice(0, 4),
  new Array(8).fill(WHITE_PAWN),
  [
    WHITE_ROOK,
    WHITE_KNIGHT,
    WHITE_BISHOP,
    WHITE_QUEEN,
    WHITE_KING,
    WHITE_BISHOP,
    WHITE_KNIGHT,
    WHITE_ROOK
  ]
];
const PARSED_PARTIAL_POSITION = [
  [ null, null, BLACK_PAWN, null ],
  [ null, null, BLACK_KING, BLACK_PAWN ],
  [ null, WHITE_QUEEN, null, null ],
  [ WHITE_PAWN, null, null, null ]
];

const STARTING_POSITION_POSITION = STARTING_POSITION.split(" ")[0];

describe("parsePosition", () => {

  describe("when the FEN is empty", () => {

    it("raises an error", () => {
      expect(() => parsePosition("")).toThrow();
    });
  });

  describe("when the FEN is blank", () => {

    it("raises an error", () => {
      expect(() => parsePosition(" \t ")).toThrow();
    });
  });

  describe("when the FEN's position contains invalid characters", () => {

    it("raises an error", () => {
      expect(() => parsePosition("😎")).toThrow();
    });
  });

  describe("when the FEN is the starting position", () => {

    it("parses the position", () => {
      expect(parsePosition(STARTING_POSITION)).toEqual(PARSED_STARTING_POSITION);
    });
  });

  describe("when the FEN is an empty position", () => {

    it("parses the position", () => {
      expect(parsePosition(EMPTY_POSITION)).toEqual(PARSED_EMPTY_POSITION);
    });
  });

  describe("when the FEN only contains a position", () => {

    it("parses the FEN", () => {
      expect(parsePosition(STARTING_POSITION_POSITION)).toEqual(PARSED_STARTING_POSITION);
    });
  });

  describe("when the FEN position is not a standard size", () => {

    it("parses the smaller FEN", () => {
      expect(parsePosition("2p1/2kp/1Q2/P3")).toEqual(PARSED_PARTIAL_POSITION);
    });
  });

  describe("when the FEN contains uneven ranks", () => {

    it("fills the missing values with null", () => {
      expect(parsePosition("2p/2kp/1Q/P")).toEqual(PARSED_PARTIAL_POSITION);
    });
  });
});

// TODO: This should be more thoroughly tested.
describe("resizeParsedPosition", () => {
  let position: NullablePlayerPiece[][];

  beforeEach(() => position = parsePosition(STARTING_POSITION));

  it("resizes the position", () => {
    const expectedPosition = [
      new Array(5).fill(BLACK_PAWN),
      ...PARSED_EMPTY_POSITION.slice(0, 4).map(rank => rank.slice(0, 5)),
      new Array(5).fill(WHITE_PAWN),
      [
        WHITE_ROOK,
        WHITE_KNIGHT,
        WHITE_BISHOP,
        WHITE_QUEEN,
        WHITE_KING
      ]
    ];

    expect(resizeParsedPosition(position, 5, 7)).toEqual(expectedPosition);
  });
});

describe("sanitizeFEN", () => {
  describe("when the FEN is perfectly formatted", () => {
    it("returns the FEN unmodified", () => {
      expect(sanitizeFEN(STARTING_POSITION)).toEqual(STARTING_POSITION);
    });
  });

  describe("when the FEN is not perfectly formatted", () => {
    it("sanitizes the FEN", () => {
      expect(sanitizeFEN(STARTING_POSITION)).toEqual(STARTING_POSITION);
    });
  });

  describe("when some of the lines are not complete", () => {

    it("fills the remaining space with empty values", () => {
      expect(sanitizeFEN("2p1/2kp/1Q2/P3/8/8/8/8 w KQkq - 0 1"))
        .toEqual("2p5/2kp4/1Q6/P7/8/8/8/8 w KQkq - 0 1");
    });
  });

  describe("when there aren't enough lines", () => {

    it("fills the missing lines with empty spaces", () => {
      expect(sanitizeFEN("rnbqkbnr/pppppppp/8/8 w KQkq - 0 1"))
        .toEqual("rnbqkbnr/pppppppp/8/8/8/8/8/8 w KQkq - 0 1");
    });
  });

  describe("when there are too many lines", () => {

    it("fills the missing lines with empty spaces", () => {
      expect(sanitizeFEN("rnbqkbnr/pppppppp/8/8/8/8/8/8/8/8/8/8/8/8/8/8 w KQkq - 0 1"))
        .toEqual("rnbqkbnr/pppppppp/8/8/8/8/8/8 w KQkq - 0 1");
    });
  });

  describe("when the FEN is missing some of its parts", () => {

    it("sets the missing parts to the values in the empty position", () => {
      expect(sanitizeFEN(STARTING_POSITION_POSITION)).toEqual(STARTING_POSITION);
    });
  });

  describe("when the FEN is empty", () => {

    it("sets the FEN to the empty position", () => {
      expect(sanitizeFEN("")).toEqual(EMPTY_POSITION);
    });
  });
});

describe("fenPositionsEqual", () => {

  describe("when the two FENs are identical", () => {

    it("returns true", () => {
      expect(fenPositionsEqual(STARTING_POSITION, STARTING_POSITION)).toEqual(true);
    });
  });

  describe("when the two fens are equivilent when sanitized", () => {

    it("returns true", () => {
      expect(fenPositionsEqual(STARTING_POSITION_POSITION, STARTING_POSITION)).toEqual(true);
    });
  });

  describe("when the two fens are not equivilent", () => {

    it("returns false", () => {
      expect(fenPositionsEqual(EMPTY_POSITION, STARTING_POSITION)).toEqual(false);
    });
  });
});

describe("isFenValid", () => {

  describe("when the FEN is valid", () => {

    it("returns true", () => {
      expect(isFenValid(STARTING_POSITION)).toEqual(true);
    });
  });

  describe("when the FEN is valid when sanitized", () => {

    it("returns false", () => {
      expect(isFenValid(STARTING_POSITION_POSITION)).toEqual(false);
    });
  });

  describe("when the FEN is not valid", () => {

    it("returns false", () => {
      expect(isFenValid("banana")).toEqual(false);
    });
  });
});

describe("startingPlayer", () => {

  describe("when the FEN does not have a starting player", () => {

    it("throws an error", () => {
      expect(() => startingPlayer(STARTING_POSITION_POSITION)).toThrow();
    });
  });

  describe("when the FEN's starting player is white", () => {

    it("returns white", () => {
      expect(startingPlayer(STARTING_POSITION)).toEqual(WHITE);
    });
  });

  describe("when the FEN's starting player is black", () => {

    it("returns black", () => {
      expect(startingPlayer(KINGS_PAWN_OPENING)).toEqual(BLACK);
    });
  });
});

describe("setFenStartingPlayer", () => {

  describe("when the FEN is not valid", () => {

    it("throws an error", () => {
      expect(() => setFenStartingPlayer("banana", WHITE)).toThrow();
    });
  });

  describe("when the player is the same", () => {

    it("returns the FEN unmodified", () => {
      expect(setFenStartingPlayer(STARTING_POSITION, WHITE)).toEqual(STARTING_POSITION);
      expect(setFenStartingPlayer(KINGS_PAWN_OPENING, BLACK)).toEqual(KINGS_PAWN_OPENING);
    });
  });

  describe("when the player is different", () => {

    it("modifies the FEN", () => {
      expect(setFenStartingPlayer(STARTING_POSITION, BLACK))
        .toEqual("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 0 1");
      expect(setFenStartingPlayer(KINGS_PAWN_OPENING, WHITE))
        .toEqual("rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e3 0 1");
    });
  });
});

describe("fenCanCastle", () => {

  describe("when the FEN is not valid", () => {

    it("throws an error", () => {
      expect(() => fenCanCastle("banana", WHITE, KINGSIDE)).toThrow();
    });
  });

  describe("when the player can castle", () => {

    it("returns true", () => {
      expect(fenCanCastle(STARTING_POSITION, WHITE, KINGSIDE)).toEqual(true);
      expect(fenCanCastle(STARTING_POSITION, WHITE, QUEENSIDE)).toEqual(true);
      expect(fenCanCastle(STARTING_POSITION, BLACK, KINGSIDE)).toEqual(true);
      expect(fenCanCastle(STARTING_POSITION, BLACK, QUEENSIDE)).toEqual(true);
    });
  });

  describe("when the player can't castle", () => {

    it("returns false", () => {
      expect(fenCanCastle(CAPTURE_POSITION, WHITE, KINGSIDE)).toEqual(false);
      expect(fenCanCastle(CAPTURE_POSITION, WHITE, QUEENSIDE)).toEqual(false);
      expect(fenCanCastle(CAPTURE_POSITION, BLACK, KINGSIDE)).toEqual(false);
      expect(fenCanCastle(CAPTURE_POSITION, BLACK, QUEENSIDE)).toEqual(false);
    });
  });
});

describe("setFenCanCastle", () => {

  describe("when the FEN is not valid", () => {

    it("throws an error", () => {
      expect(() => setFenCanCastle("banana", WHITE, KINGSIDE, true)).toThrow();
    });
  });

  describe("when the value is false", () => {

    describe("when the player can castle", () => {

      it("sets the castling rights", () => {
        expect(setFenCanCastle(STARTING_POSITION, WHITE, KINGSIDE, false))
          .toEqual("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w Qkq - 0 1");
        expect(setFenCanCastle(STARTING_POSITION, WHITE, QUEENSIDE, false))
          .toEqual("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w Kkq - 0 1");
        expect(setFenCanCastle(STARTING_POSITION, BLACK, KINGSIDE, false))
          .toEqual("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQq - 0 1");
        expect(setFenCanCastle(STARTING_POSITION, BLACK, QUEENSIDE, false))
          .toEqual("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQk - 0 1");
      });
    });

    describe("when the player can't castle", () => {

      it("does not change the castling rights", () => {
        expect(setFenCanCastle(CAPTURE_POSITION, WHITE, KINGSIDE, false))
          .toEqual(CAPTURE_POSITION);
        expect(setFenCanCastle(CAPTURE_POSITION, WHITE, QUEENSIDE, false))
          .toEqual(CAPTURE_POSITION);
        expect(setFenCanCastle(CAPTURE_POSITION, BLACK, KINGSIDE, false))
          .toEqual(CAPTURE_POSITION);
        expect(setFenCanCastle(CAPTURE_POSITION, BLACK, QUEENSIDE, false))
          .toEqual(CAPTURE_POSITION);
      });
    });
  });

  describe("when the value is true", () => {

    describe("when the player can already castle", () => {

      it("does not change the castling rights", () => {
        expect(setFenCanCastle(STARTING_POSITION, WHITE, KINGSIDE, false))
          .toEqual("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w Qkq - 0 1");
        expect(setFenCanCastle(STARTING_POSITION, WHITE, QUEENSIDE, false))
          .toEqual("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w Kkq - 0 1");
        expect(setFenCanCastle(STARTING_POSITION, BLACK, KINGSIDE, false))
          .toEqual("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQq - 0 1");
        expect(setFenCanCastle(STARTING_POSITION, BLACK, QUEENSIDE, false))
          .toEqual("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQk - 0 1");
      });
    });

    describe("when the player can't castle", () => {

      it("sets the castling rights", () => {
        expect(setFenCanCastle(CAPTURE_POSITION, WHITE, KINGSIDE, true))
          .toEqual("4k3/8/8/8/6R1/8/8/4K3 b K - 0 1");
        expect(setFenCanCastle(CAPTURE_POSITION, WHITE, QUEENSIDE, true))
          .toEqual("4k3/8/8/8/6R1/8/8/4K3 b Q - 0 1");
        expect(setFenCanCastle(CAPTURE_POSITION, BLACK, KINGSIDE, true))
          .toEqual("4k3/8/8/8/6R1/8/8/4K3 b k - 0 1");
        expect(setFenCanCastle(CAPTURE_POSITION, BLACK, QUEENSIDE, true))
          .toEqual("4k3/8/8/8/6R1/8/8/4K3 b q - 0 1");
      });
    });

    describe("when none of the players can castle", () => {

      it("sets the castling rights to a single dash", () => {
        let fen = setFenCanCastle(STARTING_POSITION, WHITE, KINGSIDE, false);
        fen = setFenCanCastle(fen, WHITE, QUEENSIDE, false);
        fen = setFenCanCastle(fen, BLACK, KINGSIDE, false);
        fen = setFenCanCastle(fen, BLACK, QUEENSIDE, false);

        expect(fen).toEqual("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 1");
      });
    });
  });
});

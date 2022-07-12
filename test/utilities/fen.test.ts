import {
  BLACK_BISHOP,
  BLACK_KING,
  BLACK_KNIGHT,
  BLACK_PAWN,
  BLACK_QUEEN,
  BLACK_ROOK,
  EMPTY_POSITION,
  STARTING_POSITION,
  WHITE_BISHOP,
  WHITE_KING,
  WHITE_KNIGHT,
  WHITE_PAWN,
  WHITE_QUEEN,
  WHITE_ROOK
} from "../../src/constants";
import { parsePosition } from "../../src/utilities/fen";

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
      expect(parsePosition(STARTING_POSITION.split(" ")[0])).toEqual(PARSED_STARTING_POSITION);
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

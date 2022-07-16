import {
  BLACK,
  DARK_SQUARE,
  LIGHT_SQUARE,
  SQUARES,
  WHITE
} from "../../src/constants";
import { Square } from "../../src/types";
import {
  indicesToSquare,
  isKnightMove,
  orientIndices,
  reverseYIndex,
  squareColor,
  squareToIndices
} from "../../src/utilities/squares";

const KNIGHT_MOVES_FROM_D4: Square[] = [ "b3", "b5", "c2", "c6", "e2", "e6", "f3", "f5" ];

describe("squareToIndices", () => {

  it("returns the indices corresponding to the square", () => {
    expect(squareToIndices("a1")).toEqual([ 0, 0 ]);
    expect(squareToIndices("h8")).toEqual([ 7, 7 ]);
    expect(squareToIndices("c5")).toEqual([ 2, 4 ]);
    expect(squareToIndices("f7")).toEqual([ 5, 6 ]);
  });
});

describe("indicesToSquare", () => {

  describe("when the file is too small", () => {

    it("throws an error", () => {
      expect(() => indicesToSquare([ -1, 0 ])).toThrow();
    });
  });

  describe("when the file is too large", () => {

    it("throws an error", () => {
      expect(() => indicesToSquare([ 8, 0 ])).toThrow();
    });
  });

  describe("when the rank is too small", () => {

    it("throws an error", () => {
      expect(() => indicesToSquare([ 0, -1 ])).toThrow();
    });
  });

  describe("when the rank is too large", () => {

    it("throws an error", () => {
      expect(() => indicesToSquare([ 0, 8 ])).toThrow();
    });
  });

  describe("when the indices are valid", () => {

    it("returns the square corresponding to the indices", () => {
      expect(indicesToSquare([ 0, 0 ])).toEqual("a1");
      expect(indicesToSquare([ 7, 7 ])).toEqual("h8");
      expect(indicesToSquare([ 2, 4 ])).toEqual("c5");
      expect(indicesToSquare([ 5, 6 ])).toEqual("f7");
    });
  });
});

describe("#reverseYIndex", () => {

  describe("when the file is too small", () => {

    it("throws an error", () => {
      expect(() => reverseYIndex([ -1, 0 ])).toThrow();
    });
  });

  describe("when the file is too large", () => {

    it("throws an error", () => {
      expect(() => reverseYIndex([ 8, 0 ])).toThrow();
    });
  });

  describe("when the rank is too small", () => {

    it("throws an error", () => {
      expect(() => reverseYIndex([ 0, -1 ])).toThrow();
    });
  });

  describe("when the rank is too large", () => {

    it("throws an error", () => {
      expect(() => reverseYIndex([ 0, 8 ])).toThrow();
    });
  });

  it("reverses the Y index", () => {
    expect(reverseYIndex([ 0, 0 ])).toEqual([ 0, 7 ]);
    expect(reverseYIndex([ 7, 7 ])).toEqual([ 7, 0 ]);
    expect(reverseYIndex([ 2, 4 ])).toEqual([ 2, 3 ]);
    expect(reverseYIndex([ 5, 6 ])).toEqual([ 5, 1 ]);
  });
});

describe("#orientIndices", () => {

  describe("when the file is too small", () => {

    it("throws an error", () => {
      expect(() => orientIndices([ -1, 0 ], WHITE)).toThrow();
    });
  });

  describe("when the file is too large", () => {

    it("throws an error", () => {
      expect(() => orientIndices([ 8, 0 ], WHITE)).toThrow();
    });
  });

  describe("when the rank is too small", () => {

    it("throws an error", () => {
      expect(() => orientIndices([ 0, -1 ], WHITE)).toThrow();
    });
  });

  describe("when the rank is too large", () => {

    it("throws an error", () => {
      expect(() => orientIndices([ 0, 8 ], WHITE)).toThrow();
    });
  });

  describe("when the orientation is white", () => {

    it("does not reverse the indices", () => {
      expect(orientIndices([ 0, 0 ], WHITE)).toEqual([ 0, 0 ]);
      expect(orientIndices([ 7, 7 ], WHITE)).toEqual([ 7, 7 ]);
      expect(orientIndices([ 2, 4 ], WHITE)).toEqual([ 2, 4 ]);
      expect(orientIndices([ 5, 6 ], WHITE)).toEqual([ 5, 6 ]);
    });
  });

  describe("when the orientation is black", () => {

    it("reverses the indices", () => {
      expect(orientIndices([ 0, 0 ], BLACK)).toEqual([ 7, 7 ]);
      expect(orientIndices([ 7, 7 ], BLACK)).toEqual([ 0, 0 ]);
      expect(orientIndices([ 2, 4 ], BLACK)).toEqual([ 5, 3 ]);
      expect(orientIndices([ 5, 6 ], BLACK)).toEqual([ 2, 1 ]);
    });
  });
});

describe("#isKnightMove", () => {

  describe("when the move is a knight move", () => {

    it("returns true", () => {
      KNIGHT_MOVES_FROM_D4.forEach(to => {
        expect(isKnightMove("d4", to)).toEqual(true);
      });
    });
  });

  describe("when the move is not knight move", () => {

    it("returns true", () => {
      SQUARES.forEach((to: Square) => {
        if (!KNIGHT_MOVES_FROM_D4.includes(to)) {
          expect(isKnightMove("d4", to)).toEqual(false);
        }
      });
    });
  });
});

describe("squareColor", () => {

  describe("when the square is a light square", () => {

    it("returns light square", () => {
      expect(squareColor("a2")).toEqual(LIGHT_SQUARE);
      expect(squareColor("h1")).toEqual(LIGHT_SQUARE);
      expect(squareColor("a8")).toEqual(LIGHT_SQUARE);
      expect(squareColor("h7")).toEqual(LIGHT_SQUARE);
    });
  });

  describe("when the square is a dark square", () => {

    it("returns dark square", () => {
      expect(squareColor("a1")).toEqual(DARK_SQUARE);
      expect(squareColor("h2")).toEqual(DARK_SQUARE);
      expect(squareColor("a7")).toEqual(DARK_SQUARE);
      expect(squareColor("h8")).toEqual(DARK_SQUARE);
    });
  });
});

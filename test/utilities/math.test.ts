import { addConstant, distance, lengthenSegment, mod, radiansToDegrees } from "../../src/utilities/math";

describe("radiansToDegrees", () => {

  describe("when the value is 0", () => {

    it("returns 0", () => {
      expect(radiansToDegrees(0)).toBeCloseTo(0, 4);
    });
  });

  describe("when the value is pi", () => {

    it("returns 180", () => {
      expect(radiansToDegrees(Math.PI)).toBeCloseTo(180, 4);
    });
  });

  describe("when the value is 1", () => {

    it("returns about 57 degrees", () => {
      expect(radiansToDegrees(1)).toBeCloseTo(57.2958, 4);
    });
  });
});

describe("distance", () => {

  it("returns the pythagorean distance between the two coordinates", () => {
    expect(distance([ 1, 2 ], [ 4, 6 ])).toEqual(5);
  });
});

describe("mod", () => {

  describe("when the dividend is 0", () => {

    it("returns 0", () => {
      expect(mod(0, 3)).toEqual(0);
    });
  });

  describe("when the dividend is less than the divisor", () => {

    it("returns the remainder", () => {
      expect(mod(2, 3)).toEqual(2);
    });
  });

  describe("when the dividend is equal to the divisor", () => {

    it("returns 0", () => {
      expect(mod(3, 3)).toEqual(0);
    });
  });

  describe("when the dividend is greater than the divisor", () => {

    it("returns the remainder", () => {
      expect(mod(5, 3)).toEqual(2);
    });
  });

  describe("when the dividend is greater than the negation of the divisor", () => {

    it("returns the remainder", () => {
      expect(mod(-2, 3)).toEqual(1);
    });
  });

  describe("when the dividend is equal to the negation of the divisor", () => {

    it("returns 0", () => {
      expect(mod(-3, 3)).toEqual(0);
    });
  });

  describe("when the dividend is less than the negation of the divisor", () => {

    it("returns the remainder", () => {
      expect(mod(-5, 3)).toEqual(1);
    });
  });
});

describe("distance", () => {

  it("returns the sum of the vector and the constant", () => {
    expect(addConstant([ 1, 2 ], 2)).toEqual([ 3, 4 ]);
  });
});

describe("lengthenSegment", () => {

  describe("when the amount is 0", () => {

    it("returns the original to", () => {
      expect(lengthenSegment([ 1, 2 ], [ 4, 6 ], 0)).toEqual([ 4, 6 ]);
    });
  });

  describe("when the amount is positive", () => {

    it("lengthens the segment", () => {
      expect(lengthenSegment([ 1, 2 ], [ 4, 6 ], 5)).toEqual([ 7, 10 ]);
    });
  });

  describe("when the amount is negative", () => {

    it("shrinks the segment", () => {
      expect(lengthenSegment([ 1, 2 ], [ 7, 10 ], -5)).toEqual([ 4, 6 ]);
    });
  });
});

import { assert } from "chai";

import type { PM } from "testeranto/src/PM";
import { IPM } from "testeranto/src/lib/types";
import {
  Ibdd_in,
  Ibdd_out,
  IPartialInterface,
  ITestImplementation,
  ITestSpecification,
} from "testeranto/src/Types";
import { SP_2d_Vector } from "./SP_2d_Vector";
import Testeranto from "testeranto/src/Pure";

type M = {
  givens: {
    Default: () => SP_2d_Vector;
    ByXAndY: (x: number, y: number) => SP_2d_Vector;
  };
  whens: Record<string, never>; // No whens defined
  thens: {
    magnitude: (expected: number) => (v: SP_2d_Vector) => SP_2d_Vector;
    add: (x: number, y: number) => (v: SP_2d_Vector) => SP_2d_Vector;
    multiply: (scalar: number) => (v: SP_2d_Vector) => SP_2d_Vector;
    dot: (x: number, y: number, expected: number) => (v: SP_2d_Vector) => SP_2d_Vector;
    distance: (x: number, y: number, expected: number) => (v: SP_2d_Vector) => SP_2d_Vector;
    rotate: (angle: number, x: number, y: number) => (v: SP_2d_Vector) => SP_2d_Vector;
    normalize: (expectedX: number, expectedY: number) => (v: SP_2d_Vector) => SP_2d_Vector;
  };
  checks: {
    Default: () => SP_2d_Vector;
    ByXAndY: (x: number, y: number) => SP_2d_Vector;
  };
};

export const imp: ITestImplementation<I, O, M> = {
  suites: {
    Default: "a default suite",
  },

  givens: {
    Default: () => new SP_2d_Vector(0, 0),
    ByXAndY: (x, y) => {
      return new SP_2d_Vector(x, y);
    },
  },

  whens: {},

  thens: {
    magnitude: (expected) => (vector) => {
      const actual = vector.magnitude();
      assert.closeTo(
        actual,
        expected,
        0.000001,
        `Expected magnitude ${expected} but got ${actual}`
      );
      return vector;
    },

    add: (x, y) => (vector) => {
      const oldVector = Object.assign({}, vector);
      const result = vector.add(new SP_2d_Vector(x, y));
      
      assert.closeTo(
        result.x,
        oldVector.x + x,
        0.000001,
        `X component after addition`
      );

      assert.closeTo(
        result.y,
        oldVector.y + y,
        0.000001,
        `Y component after addition`
      );

      return result;
    },

    multiply: (scalar) => (vector) => {
      const oldVector = Object.assign({}, vector);
      const result = vector.multiply(scalar);
      
      assert.closeTo(
        result.x,
        oldVector.x * scalar,
        0.000001,
        `X component after multiplication`
      );

      assert.closeTo(
        result.y,
        oldVector.y * scalar,
        0.000001,
        `Y component after multiplication`
      );

      return result;
    },

    dot: (x, y, expected) => (vector) => {
      const actual = vector.dot(new SP_2d_Vector(x, y));
      assert.closeTo(
        actual,
        expected,
        0.000001,
        `Dot product calculation`
      );
      return vector;
    },

    distance: (x, y, expected) => (vector) => {
      const actual = vector.distance(new SP_2d_Vector(x, y));
      assert.closeTo(
        actual,
        expected,
        0.000001,
        `Distance calculation`
      );
      return vector;
    },

    rotate: (angle, x, y) => (vector) => {
      const oldVector = Object.assign({}, vector);

      const rotatedVector = vector.rotate(angle);

      assert.closeTo(
        rotatedVector.x,
        x,
        0.000001,
        `${JSON.stringify(oldVector)}, rotated by ${angle}, x component`
      );

      assert.closeTo(
        rotatedVector.y,
        y,
        0.000001,
        `${JSON.stringify(oldVector)}, rotated by ${angle}, y component`
      );

      return rotatedVector;
    },

    normalize: (expectedX, expectedY) => (vector) => {
      const oldVector = Object.assign({}, vector);
      const normalizedVector = vector.normalize();
      
      assert.closeTo(
        normalizedVector.x,
        expectedX,
        0.000001,
        `${JSON.stringify(oldVector)} normalized x component`
      );

      assert.closeTo(
        normalizedVector.y,
        expectedY,
        0.000001,
        `${JSON.stringify(oldVector)} normalized y component`
      );

      return normalizedVector;
    },
  },

  checks: {
    Default: () => new SP_2d_Vector(0, 0),
    ByXAndY: (x: number, y: number) => new SP_2d_Vector(x, y),
  },
};

type I = Ibdd_in<
  null,
  null,
  SP_2d_Vector,
  SP_2d_Vector,
  SP_2d_Vector,
  (...args: unknown[]) => (v: SP_2d_Vector, utils: IPM) => SP_2d_Vector,
  (v: SP_2d_Vector, utils: IPM) => SP_2d_Vector
>;

const interf: IPartialInterface<I> = {
  beforeAll: async (): Promise<void> => {},
  beforeEach: async (subject, i, tr, iv: unknown[]): Promise<SP_2d_Vector> => {
    return i(...(iv || []));
  },
  andWhen: async function (s: SP_2d_Vector, whenCB: unknown, tr: unknown, utils: IPM): Promise<SP_2d_Vector> {
    if (typeof whenCB === 'function') {
      return (whenCB as (v: SP_2d_Vector) => (v: SP_2d_Vector, utils: IPM) => SP_2d_Vector)(s)(s, utils);
    }
    return s;
  },
  butThen: async (s: SP_2d_Vector, t, tr, pm): Promise<SP_2d_Vector> => {
    if (t) {
      return t(s, pm);
    }
    return s;
  },
};

type O = Ibdd_out<
  {
    Default: [string];
  },
  {
    Default: [];
    ByXAndY: [number, number];
  },
  {
    rotate: [number, number, number];
    normalize: [number, number];
    magnitude: [number];
    add: [number, number];
    multiply: [number];
    dot: [number, number, number];
    distance: [number, number, number];
  },
  {
    rotate: [number, number, number];
    normalize: [number, number];
    magnitude: [number];
    add: [number, number];
    multiply: [number];
    dot: [number, number, number];
    distance: [number, number, number];
  },
  {
    Default: [];
    ByXAndY: [number, number];
  }
>;

export const spec: ITestSpecification<I, O> = (
  Suite,
  Given,
  When,
  Then,
  Check
) => {
  // const helper = (angle: number, x: number, y: number, feature: string) => {
  //   return Given.Default([feature], [], [Then.rotate(angle, x, y)]);
  // };

  return [
    Suite.Default(
      "Testing an implementation of a 2d vector",
      {
        test0: Given.Default(
          ["The zero vector rotated by 1.2 is still the zero vector"],
          [],
          [Then.rotate(1.2, 0, 0)]
        ),

        test1: Given.ByXAndY(
          ["The vector [3, 4] rotated by 1.2 is not zero"],
          [],
          [Then.rotate(1.2, -2.641083080438884, 4.245548275808373)],
          3,
          4
        ),

        // New test cases
        test2: Given.ByXAndY(
          ["Rotate [1, 0] by pi/2 (90 degrees) should be [0, 1]"],
          [],
          [Then.rotate(Math.PI / 2, 0, 1)],
          1,
          0
        ),

        test3: Given.ByXAndY(
          ["Rotate [0, 1] by pi (180 degrees) should be [0, -1]"],
          [],
          [Then.rotate(Math.PI, 0, -1)],
          0,
          1
        ),

        test4: Given.ByXAndY(
          ["Rotate [1, 1] by -pi/2 (-90 degrees) should be [1, -1]"],
          [],
          [Then.rotate(-Math.PI / 2, 1, -1)],
          1,
          1
        ),

        test5: Given.ByXAndY(
          ["Rotate [-1, 0] by 3pi/2 (270 degrees) should be [0, -1]"],
          [],
          [Then.rotate((3 * Math.PI) / 2, 0, -1)],
          -1,
          0
        ),

        test6: Given.ByXAndY(
          ["Rotate [2, 2] by 0 radians should be [2, 2]"],
          [],
          [Then.rotate(0, 2, 2)],
          2,
          2
        ),

        test7: Given.ByXAndY(
          ["Rotate [5, -2] by a small angle (0.001 radians)"],
          [],
          [Then.rotate(0.001, 5.001997499666875, -1.9949990008334166)],
          5,
          -2
        ),

        test8: Given.ByXAndY(
          ["Rotate [1, 0] by 2pi (360 degrees) should be [1, 0]"],
          [],
          [Then.rotate(2 * Math.PI, 1, 0)],
          1,
          0
        ),

        test10: Given.ByXAndY(
          ["<3,4> normalized is <0.6,0.8>"],
          [],
          [Then.normalize(0.6, 0.8)],
          3,
          4
        ),
        test11: Given.ByXAndY(
          ["<1,0> normalized is <1,0>"],
          [],
          [Then.normalize(1, 0)],
          1,
          0
        ),
        test12: Given.ByXAndY(
          ["<0,1> normalized is <0,1>"],
          [],
          [Then.normalize(0, 1)],
          0,
          1
        ),
        test13: Given.ByXAndY(
          ["<0.5,0.5> normalized is ~<0.7071,0.7071>"],
          [],
          [Then.normalize(0.7071067811865475, 0.7071067811865475)],
          0.5,
          0.5
        ),
        test14: Given.ByXAndY(
          ["<0,0> normalized is <0,0> (edge case)"],
          [],
          [Then.normalize(0, 0)],
          0,
          0
        ),

        // New vector operation tests
        test15: Given.ByXAndY(
          ["Magnitude of <3,4> is 5"],
          [],
          [Then.magnitude(5)],
          3,
          4
        ),

        test16: Given.ByXAndY(
          ["Adding <1,2> to <3,4> gives <4,6>"],
          [],
          [Then.add(1, 2)],
          3,
          4
        ),

        test17: Given.ByXAndY(
          ["Multiplying <3,4> by 2 gives <6,8>"],
          [],
          [Then.multiply(2)],
          3,
          4
        ),

        test18: Given.ByXAndY(
          ["Dot product of <1,2> and <3,4> is 11"],
          [],
          [Then.dot(3, 4, 11)],
          1,
          2
        ),

        test19: Given.ByXAndY(
          ["Distance between <1,1> and <4,5> is 5"],
          [],
          [Then.distance(4, 5, 5)],
          1,
          1
        ),
      },
      []
    ),
  ];
};

export default Testeranto<I, O, M>(null, spec, imp, interf);

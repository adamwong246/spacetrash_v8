import { assert } from "chai";

import { IPM } from "testeranto/src/lib/types";
import {
  Ibdd_in,
  Ibdd_out,
  // IPartialInterface,
  ITestImplementation,
  ITestSpecification,
} from "testeranto/src/CoreTypes";
import { SP_2d_Vector } from "./SP_2d_Vector";
import Testeranto from "testeranto/src/Pure";
import { EPSILON } from ".";

type M = {
  givens: {
    [K in keyof O["givens"]]: (...Iw: O["givens"][K]) => SP_2d_Vector;
  };
  whens: {
    [K in keyof O["whens"]]: (
      ...Iw: O["whens"][K]
    ) => (mp: SP_2d_Vector) => SP_2d_Vector;
  };
  thens: {
    [K in keyof O["thens"]]: (
      ...Iw: O["thens"][K]
    ) => (mp: SP_2d_Vector) => SP_2d_Vector;
  };
};

export const imp: ITestImplementation<I, O, M> = {
  suites: {
    Default: "Testing SP_2d_Vector implementation",
  },

  givens: {
    Default: () => new SP_2d_Vector(0, 0),
    ByXAndY: (x, y) => new SP_2d_Vector(x, y),
  },

  whens: {

    rotate: (angle) => async (vector, _tr, _utils) => {
      return vector.rotate(angle);
    },
    add: (x, y) => async (vector, _tr, _utils) => {
      return vector.add(new SP_2d_Vector(x, y));
    },
    multiply: (scalar) => async (vector, _tr, _utils) => {
      return vector.multiply(scalar);
    },
    clone: () => async (vector, _tr, _utils) => {
      return vector.clone();
    },
  },

  thens: {
    magnitude: (expected) => (vector, _utils) => {
      assert.closeTo(vector.magnitude(), expected, EPSILON);
      return vector;
    },
    len: (expected) => (vector, _utils) => {
      assert.closeTo(vector.len(), expected, EPSILON);
      return vector;
    },
    dot: (x, y, expected) => (vector, _utils) => {
      assert.closeTo(vector.dot(new SP_2d_Vector(x, y)), expected, EPSILON);
      return vector;
    },
    distance: (x, y, expected) => (vector, _utils) => {
      assert.closeTo(vector.distance(new SP_2d_Vector(x, y)), expected, EPSILON);
      return vector;
    },
    position: (expectedX, expectedY) => (vector, _utils) => {
      assert.closeTo(vector.x, expectedX, EPSILON);
      assert.closeTo(vector.y, expectedY, EPSILON);
      return vector;
    },
    isPointOnSegment: (aX, aY, bX, bY, expected) => (vector, _utils) => {
      const a = new SP_2d_Vector(aX, aY);
      const b = new SP_2d_Vector(bX, bY);
      assert.equal(SP_2d_Vector.isPointOnSegment(vector, a, b), expected);
      return vector;
    },
    toString: (expected) => (vector, _utils) => {
      assert.equal(vector.toString(), expected);
      return vector;
    },
  },

  checks: {
    Default: () => new SP_2d_Vector(0, 0),
    ByXAndY: (x, y) => new SP_2d_Vector(x, y),
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
    Default: ["Testing SP_2d_Vector implementation"];
  },
  {
    Default: [];
    ByXAndY: [number, number];
  },
  {
    // add: [number, number];
    // multiply: [number];
    // clone: [];
    // rotate: [number];
  },
  {
    
    magnitude: [number];
    len: [number];
    dot: [number, number, number];
    distance: [number, number, number];
    position: [number, number];
    isPointOnSegment: [number, number, number, number, boolean];
    toString: [string];
    rotatedItIs: [number, number, number]
    normalizedItIs: [number, number]
    addedItIs: [number, number, number, number]
    multipliedItIs: [number, number, number]
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
          [Then.rotatedItIs(1.2, 0, 0)]
        ),

        test1: Given.ByXAndY(
          ["The vector [3, 4] rotated by 1.2 is not zero"],
          [],
          [Then.rotatedItIs(1.2, -2.641083080438884, 4.245548275808373)],
          3,
          4
        ),

        // New test cases
        test2: Given.ByXAndY(
          ["Rotate [1, 0] by pi/2 (90 degrees) should be [0, 1]"],
          [],
          [Then.rotatedItIs(Math.PI / 2, 0, 1)],
          1,
          0
        ),

        test3: Given.ByXAndY(
          ["Rotate [0, 1] by pi (180 degrees) should be [0, -1]"],
          [],
          [Then.rotatedItIs(Math.PI, 0, -1)],
          0,
          1
        ),

        test4: Given.ByXAndY(
          ["Rotate [1, 1] by -pi/2 (-90 degrees) should be [1, -1]"],
          [],
          [Then.rotatedItIs(-Math.PI / 2, 1, -1)],
          1,
          1
        ),

        test5: Given.ByXAndY(
          ["Rotate [-1, 0] by 3pi/2 (270 degrees) should be [0, -1]"],
          [],
          [Then.rotatedItIs((3 * Math.PI) / 2, 0, -1)],
          -1,
          0
        ),

        test6: Given.ByXAndY(
          ["Rotate [2, 2] by 0 radians should be [2, 2]"],
          [],
          [Then.rotatedItIs(0, 2, 2)],
          2,
          2
        ),

        test7: Given.ByXAndY(
          ["Rotate [5, -2] by a small angle (0.001 radians)"],
          [],
          [Then.rotatedItIs(0.001, 5.001997499666875, -1.9949990008334166)],
          5,
          -2
        ),

        test8: Given.ByXAndY(
          ["Rotate [1, 0] by 2pi (360 degrees) should be [1, 0]"],
          [],
          [Then.rotatedItIs(2 * Math.PI, 1, 0)],
          1,
          0
        ),

        test10: Given.ByXAndY(
          ["<3,4> normalized is <0.6,0.8>"],
          [],
          [Then.normalizedItIs(0.6, 0.8)],
          3,
          4
        ),
        test11: Given.ByXAndY(
          ["<1,0> normalized is <1,0>"],
          [],
          [Then.normalizedItIs(1, 0)],
          1,
          0
        ),
        test12: Given.ByXAndY(
          ["<0,1> normalized is <0,1>"],
          [],
          [Then.normalizedItIs(0, 1)],
          0,
          1
        ),
        test13: Given.ByXAndY(
          ["<0.5,0.5> normalized is ~<0.7071,0.7071>"],
          [],
          [Then.normalizedItIs(0.7071067811865475, 0.7071067811865475)],
          0.5,
          0.5
        ),
        test14: Given.ByXAndY(
          ["<0,0> normalized is <0,0> (edge case)"],
          [],
          [Then.normalizedItIs(0, 0)],
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
          [Then.addedItIs(1, 2, 4, 6)],
          3,
          4
        ),

        test17: Given.ByXAndY(
          ["Multiplying <3,4> by 2 gives <6,8>"],
          [],
          [Then.multipliedItIs(2, 6, 9)],
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

        test20: Given.ByXAndY(
          ["Clone creates identical vector"],
          [When.clone()],
          [Then.position(3, 4)],
          3,
          4
        ),

        test21: Given.ByXAndY(
          ["Magnitude matches len()"],
          [],
          [Then.magnitude(5), Then.len(5)],
          3,
          4
        ),

        test22: Given.ByXAndY(
          ["toString() returns expected format"],
          [],
          [Then.toString("SP_2d_Vector(1.5, 2.5)")],
          1.5,
          2.5
        ),

        test23: Given.ByXAndY(
          ["Point (5,5) is on segment from (0,0) to (10,10)"],
          [],
          [Then.isPointOnSegment(0, 0, 10, 10, true)],
          5,
          5
        ),
        test24: Given.ByXAndY(
          ["Point (15,15) is beyond segment from (0,0) to (10,10)"],
          [],
          [Then.isPointOnSegment(0, 0, 10, 10, false)],
          15,
          15
        ),
        test25: Given.ByXAndY(
          ["Point (5,6) is not collinear with segment from (0,0) to (10,10)"],
          [],
          [Then.isPointOnSegment(0, 0, 10, 10, false)],
          5,
          6
        ),
        test26: Given.ByXAndY(
          ["Point (0,0) is exactly at start of segment from (0,0) to (10,10)"],
          [],
          [Then.isPointOnSegment(0, 0, 10, 10, true)],
          0,
          0
        ),
        test27: Given.ByXAndY(
          ["Point (10,10) is exactly at end of segment from (0,0) to (10,10)"],
          [],
          [Then.isPointOnSegment(0, 0, 10, 10, true)],
          10,
          10
        ),
      },
      []
    ),
  ];
};

export default Testeranto<I, O, unknown>(SP_2d_Vector.prototype, spec, imp, interf);

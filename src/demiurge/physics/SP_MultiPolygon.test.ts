import { assert } from "chai";
import { SP_2d_Vector } from "./SP_2d_Vector";
import { SP_Polygon } from "./SP_Polygon";
import { SP_MultiPolygon } from "./SP_MultiPolygon";
import Testeranto from "testeranto/src/Pure";
import {
  Ibdd_in,
  Ibdd_out,
  IPartialInterface,
  ITestImplementation,
  ITestSpecification,
} from "testeranto/src/Types";

type M = {
  givens: {
    [K in keyof O["givens"]]: (...Iw: O["givens"][K]) => SP_MultiPolygon;
  };
  whens: {
    [K in keyof O["whens"]]: (
      ...Iw: O["whens"][K]
    ) => (mp: SP_MultiPolygon) => SP_MultiPolygon;
  };
  thens: {
    [K in keyof O["thens"]]: (
      ...Iw: O["thens"][K]
    ) => (mp: SP_MultiPolygon) => SP_MultiPolygon;
  };
};

export const imp: ITestImplementation<I, O, M> = {
  suites: {
    Default: "MultiPolygon basic operations",
    Union: "MultiPolygon union operations",
    Difference: "MultiPolygon difference operations"
  },

  givens: {
    Default: () => new SP_MultiPolygon([]),
    TwoSquares: () => {
      const square1 = new SP_Polygon(
        new SP_2d_Vector(0, 0),
        [
          new SP_2d_Vector(0, 0),
          new SP_2d_Vector(1, 0),
          new SP_2d_Vector(1, 1),
          new SP_2d_Vector(0, 1)
        ]
      );
      const square2 = new SP_Polygon(
        new SP_2d_Vector(0.5, 0.5),
        [
          new SP_2d_Vector(0, 0),
          new SP_2d_Vector(1, 0),
          new SP_2d_Vector(1, 1),
          new SP_2d_Vector(0, 1)
        ]
      );
      return new SP_MultiPolygon([square1, square2]);
    },
    OverlappingRectangles: () => {
      const rect1 = new SP_Polygon(
        new SP_2d_Vector(0, 0),
        [
          new SP_2d_Vector(0, 0),
          new SP_2d_Vector(2, 0),
          new SP_2d_Vector(2, 1),
          new SP_2d_Vector(0, 1)
        ]
      );
      const rect2 = new SP_Polygon(
        new SP_2d_Vector(1, 0),
        [
          new SP_2d_Vector(0, 0),
          new SP_2d_Vector(2, 0),
          new SP_2d_Vector(2, 1),
          new SP_2d_Vector(0, 1)
        ]
      );
      return new SP_MultiPolygon([rect1, rect2]);
    }
  },

  whens: {
    addPolygon: (polygon: SP_Polygon) => (mp) => {
      mp.addPolygons([polygon]);
      return mp;
    },
    addMultiPolygon: (other: SP_MultiPolygon) => (mp) => {
      mp.addMultiPolygon(other);
      return mp;
    },
    union: () => (mp) => {
      return mp.union();
    },
    difference: () => (mp) => {
      return mp.difference();
    }
  },

  thens: {
    polygonCount: (expected: number) => (mp) => {
      assert.equal(mp.polygons.length, expected, 
        `Expected ${expected} polygons but got ${mp.polygons.length}`);
      return mp;
    },
    totalArea: (expected: number) => (mp) => {
      const actual = mp.polygons.reduce((sum, p) => sum + p.getArea(), 0);
      assert.closeTo(actual, expected, 0.0001,
        `Expected total area ${expected} but got ${actual}`);
      return mp;
    },
    containsPoint: (x: number, y: number, expected: boolean) => (mp) => {
      const point = new SP_2d_Vector(x, y);
      const contains = mp.polygons.some(p => p.contains(point));
      assert.equal(contains, expected,
        `Point (${x},${y}) should ${expected ? "" : "not "}be contained`);
      return mp;
    }
  },

  checks: {
    Default: () => new SP_MultiPolygon([]),
  }
};

type I = Ibdd_in<
  null,
  null,
  SP_MultiPolygon,
  SP_MultiPolygon,
  SP_MultiPolygon,
  (...x) => (mp: SP_MultiPolygon) => SP_MultiPolygon,
  (mp: SP_MultiPolygon) => SP_MultiPolygon
>;

const interf: IPartialInterface<I> = {
  beforeAll: async () => {},
  beforeEach: async (subject, i, tr, iv: unknown[]) => {
    return i(...(iv || []));
  },
  andWhen: async function (s, whenCB, tr, utils) {
    return whenCB(s);
  },
  butThen: async (s, t, tr, pm) => {
    return t(s);
  },
};

type O = Ibdd_out<
  {
    Default: [string];
    Union: [string];
    Difference: [string];
  },
  {
    Default: [];
    TwoSquares: [];
    OverlappingRectangles: [];
  },
  {
    addPolygon: [SP_Polygon];
    addMultiPolygon: [SP_MultiPolygon];
    union: [];
    difference: [];
  },
  {
    polygonCount: [number];
    totalArea: [number];
    containsPoint: [number, number, boolean];
  },
  {
    Default: [];
  }
>;

export const spec: ITestSpecification<I, O> = (
  Suite,
  Given,
  When,
  Then,
  Check
) => {
  return [
    Suite.Default("Testing basic MultiPolygon operations", {
      test0: Given.Default(
        ["Empty MultiPolygon has zero polygons"],
        [],
        [Then.polygonCount(0), Then.totalArea(0)]
      ),

      test1: Given.Default(
        ["Can add polygons to MultiPolygon"],
        [When.addPolygon(new SP_Polygon(
          new SP_2d_Vector(0, 0),
          [
            new SP_2d_Vector(0, 0),
            new SP_2d_Vector(1, 0),
            new SP_2d_Vector(1, 1)
          ]
        ))],
        [Then.polygonCount(1), Then.totalArea(0.5)]
      )
    }),

    Suite.Union("Testing MultiPolygon union operations", {
      test0: Given.TwoSquares(
        ["Union of two squares"],
        [When.union()],
        [
          Then.polygonCount(1),
          Then.totalArea(1.75),
          Then.containsPoint(0.25, 0.25, true),
          Then.containsPoint(1.25, 1.25, false)
        ]
      )
    }),

    Suite.Difference("Testing MultiPolygon difference operations", {
      test0: Given.OverlappingRectangles(
        ["Difference of overlapping rectangles"],
        [When.difference()],
        [
          Then.polygonCount(1),
          Then.totalArea(1),
          Then.containsPoint(0.5, 0.5, true),
          Then.containsPoint(1.5, 0.5, false)
        ]
      )
    })
  ];
};

export default Testeranto<I, O, M>(null, spec, imp, interf);

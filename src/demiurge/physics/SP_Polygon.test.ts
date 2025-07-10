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
import { SP_Polygon } from "./SP_Polygon";
import Testeranto from "testeranto/src/Pure";

type M = {
  givens: {
    [K in keyof O["givens"]]: (...Iw: O["givens"][K]) => SP_Polygon;
  };
  whens: {
    [K in keyof O["whens"]]: (
      ...Iw: O["whens"][K]
    ) => (p: SP_Polygon, utils: PM) => SP_Polygon;
  };
  thens: {
    [K in keyof O["thens"]]: (
      ...Iw: O["thens"][K]
    ) => (p: SP_Polygon, utils: PM) => SP_Polygon;
  };
};

export const imp: ITestImplementation<I, O, M> = {
  suites: {
    Default: "a default suite",
  },

  givens: {
    Default: () => new SP_Polygon(new SP_2d_Vector(0, 0), []),
    Rectangle: (width, height) => {
      const halfW = width / 2;
      const halfH = height / 2;
      return new SP_Polygon(
        new SP_2d_Vector(0, 0),
        [
          new SP_2d_Vector(-halfW, -halfH),
          new SP_2d_Vector(halfW, -halfH),
          new SP_2d_Vector(halfW, halfH),
          new SP_2d_Vector(-halfW, halfH)
        ]
      );
    },
    FromPoints: (points) => {
      return new SP_Polygon(new SP_2d_Vector(0, 0), points);
    },
  },

  whens: {
    translate: (x, y) => (polygon) => {
      return polygon.translate(new SP_2d_Vector(x, y));
    },
    rotate: (angle) => (polygon) => {
      return polygon.rotate(angle);
    },
    setWidth: (width) => (polygon) => {
      const currentHeight = polygon.points[2]?.y * 2 || 1; // Fallback if getHeight not available
      const halfW = width / 2;
      const halfH = currentHeight / 2;
      polygon.setPoints([
        new SP_2d_Vector(-halfW, -halfH),
        new SP_2d_Vector(halfW, -halfH),
        new SP_2d_Vector(halfW, halfH),
        new SP_2d_Vector(-halfW, halfH)
      ]);
      return polygon;
    },
    setHeight: (height) => (polygon) => {
      const currentWidth = polygon.points[1]?.x * 2 || 1; // Fallback if getWidth not available
      const halfW = currentWidth / 2;
      const halfH = height / 2;
      polygon.setPoints([
        new SP_2d_Vector(-halfW, -halfH),
        new SP_2d_Vector(halfW, -halfH),
        new SP_2d_Vector(halfW, halfH),
        new SP_2d_Vector(-halfW, halfH)
      ]);
      return polygon;
    },
  },

  thens: {
    area: (expected) => (polygon) => {
      const actual = polygon.getArea();
      assert.closeTo(
        actual,
        expected,
        0.000001,
        `Expected area ${expected} but got ${actual}`
      );
      return polygon;
    },
    getWidth: (expected) => (polygon) => {
      const actual = polygon.getWidth();
      assert.closeTo(
        actual,
        expected,
        0.000001,
        `Expected width ${expected} but got ${actual}`
      );
      return polygon;
    },
    getHeight: (expected) => (polygon) => {
      const actual = polygon.getHeight();
      assert.closeTo(
        actual,
        expected,
        0.000001,
        `Expected height ${expected} but got ${actual}`
      );
      return polygon;
    },
    AreaPlusCircumference: (expected) => (polygon) => {
      const area = polygon.getArea();
      const circumference = polygon.getCircumference();
      const actual = area + circumference;
      assert.closeTo(
        actual,
        expected,
        0.000001,
        `Expected area+circumference ${expected} but got ${actual}`
      );
      return polygon;
    },
    contains: (x, y, expected) => (polygon) => {
      const point = new SP_2d_Vector(x, y);
      const actual = polygon.contains(point);
      assert.equal(
        actual,
        expected,
        `Point ${point} should ${expected ? "" : "not "}be contained`
      );
      return polygon;
    },
    centroid: (expectedX, expectedY) => (polygon) => {
      const centroid = polygon.getCentroid();
      assert.closeTo(centroid.x, expectedX, 0.000001, `Centroid X coordinate`);
      assert.closeTo(centroid.y, expectedY, 0.000001, `Centroid Y coordinate`);
      return polygon;
    },
    pointCount: (expected) => (polygon) => {
      const actual = polygon.points.length;
      assert.equal(
        actual,
        expected,
        `Expected ${expected} points but got ${actual}`
      );
      return polygon;
    },
  },

  checks: {
    Default: () => new SP_Polygon(new SP_2d_Vector(0, 0), []),
  },
};

type I = Ibdd_in<
  null,
  null,
  SP_Polygon,
  SP_Polygon,
  SP_Polygon,
  (...x) => (p: SP_Polygon, utils: IPM) => SP_Polygon,
  (p: SP_Polygon, utils: IPM) => SP_Polygon
>;

const interf: IPartialInterface<I> = {
  beforeAll: async () => {},
  beforeEach: async (subject, i, tr, iv: unknown[]) => {
    return i(...(iv || []));
  },
  andWhen: async function (s, whenCB, tr, utils) {
    return whenCB(s, utils);
  },
  butThen: async (s, t, tr, pm) => {
    return t(s, pm);
  },
};

type O = Ibdd_out<
  {
    Default: [string];
  },
  {
    Default: [];
    Rectangle: [number, number];
    FromPoints: [SP_2d_Vector[]];
  },
  {
    translate: [number, number];
    rotate: [number];
    setWidth: [number];
    setHeight: [number];
  },
  {
    area: [number];
    getWidth: [number];
    getHeight: [number];
    AreaPlusCircumference: [number];
    contains: [number, number, boolean];
    centroid: [number, number];
    pointCount: [number];
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
    Suite.Default("Testing an implementation of a 2d polygon", {
      test0: Given.Default(
        ["Empty polygon has zero area"],
        [],
        [Then.area(0), Then.pointCount(0)]
      ),

      test1: Given.Rectangle(
        ["Rectangles have width and height"],
        [When.setWidth(4), When.setHeight(5)],
        [
          Then.getWidth(4),
          Then.getHeight(5),
          Then.area(20),
          Then.AreaPlusCircumference(38),
        ],
        1, 1 // Initial width/height
      ),

      test2: Given.FromPoints(
        ["Triangle area calculation"],
        [],
        [Then.area(0.5), Then.pointCount(3)],
        [
          new SP_2d_Vector(0, 0),
          new SP_2d_Vector(1, 0),
          new SP_2d_Vector(0, 1)
        ]
      ),

      test3: Given.Rectangle(
        ["Square contains point check"],
        [],
        [
          Then.contains(0.4, 0.4, true),  // More conservative test point
          Then.contains(1.1, 1.1, false), // Test just outside bounds
          Then.area(1),
          Then.centroid(0, 0)
        ],
        1, 1
      ),

      test4: Given.Rectangle(
        ["Translated rectangle"],
        [When.translate(2, 3)],
        [
          Then.contains(2.4, 3.4, true),  // More conservative test point
          Then.contains(2.6, 3.6, false), // Test just outside bounds
          Then.centroid(2, 3)
        ],
        1, 1
      ),

      test5: Given.Rectangle(
        ["Rotated rectangle"],
        [When.rotate(Math.PI/2)],
        [
          Then.contains(0, 0, true),
          Then.contains(1, 0, false),
          Then.contains(0, 1, true)
        ],
        1, 1
      ),
    }),
  ];
};

export default Testeranto<I, O, M>(null, spec, imp, interf);

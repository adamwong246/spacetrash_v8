import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  SP_Polygon
} from "../../../chunk-SJZOYZYM.mjs";
import {
  Pure_default,
  SP_2d_Vector,
  assert
} from "../../../chunk-QBT6DAMV.mjs";

// src/demiurge/physics/SP_Polygon.test.ts
var imp = {
  suites: {
    Default: "a default suite"
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
    }
  },
  whens: {
    translate: (x, y) => (polygon) => {
      return polygon.translate(new SP_2d_Vector(x, y));
    },
    rotate: (angle) => (polygon) => {
      return polygon.rotate(angle);
    },
    setWidth: (width) => (polygon) => {
      const currentHeight = polygon.points[2]?.y * 2 || 1;
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
      const currentWidth = polygon.points[1]?.x * 2 || 1;
      const halfW = currentWidth / 2;
      const halfH = height / 2;
      polygon.setPoints([
        new SP_2d_Vector(-halfW, -halfH),
        new SP_2d_Vector(halfW, -halfH),
        new SP_2d_Vector(halfW, halfH),
        new SP_2d_Vector(-halfW, halfH)
      ]);
      return polygon;
    }
  },
  thens: {
    area: (expected) => (polygon) => {
      const actual = polygon.getArea();
      assert.closeTo(
        actual,
        expected,
        1e-6,
        `Expected area ${expected} but got ${actual}`
      );
      return polygon;
    },
    getWidth: (expected) => (polygon) => {
      const actual = polygon.getWidth();
      assert.closeTo(
        actual,
        expected,
        1e-6,
        `Expected width ${expected} but got ${actual}`
      );
      return polygon;
    },
    getHeight: (expected) => (polygon) => {
      const actual = polygon.getHeight();
      assert.closeTo(
        actual,
        expected,
        1e-6,
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
        1e-6,
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
      assert.closeTo(centroid.x, expectedX, 1e-6, `Centroid X coordinate`);
      assert.closeTo(centroid.y, expectedY, 1e-6, `Centroid Y coordinate`);
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
    }
  },
  checks: {
    Default: () => new SP_Polygon(new SP_2d_Vector(0, 0), [])
  }
};
var interf = {
  beforeAll: async () => {
  },
  beforeEach: async (subject, i, tr, iv) => {
    return i(...iv || []);
  },
  andWhen: async function(s, whenCB, tr, utils) {
    return whenCB(s, utils);
  },
  butThen: async (s, t, tr, pm) => {
    return t(s, pm);
  }
};
var spec = (Suite, Given, When, Then, Check) => {
  return [
    Suite.Default("Testing an implementation of a 2d polygon", {
      test0: Given.Default(
        ["Empty polygon has zero area"],
        [],
        [Then.area(0), Then.pointCount(0)],
        null
      ),
      test1: Given.Rectangle(
        ["Rectangles have width and height"],
        [When.setWidth(4), When.setHeight(5)],
        [
          Then.getWidth(4),
          Then.getHeight(5),
          Then.area(20),
          Then.AreaPlusCircumference(38)
        ],
        1,
        1
        // Initial width/height
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
          Then.contains(0.4, 0.4, true),
          // More conservative test point
          Then.contains(1.1, 1.1, false),
          // Test just outside bounds
          Then.area(1),
          Then.centroid(0, 0)
        ],
        1,
        1
      ),
      test4: Given.Rectangle(
        ["Translated rectangle"],
        [When.translate(2, 3)],
        [
          Then.contains(2.4, 3.4, true),
          // More conservative test point
          Then.contains(2.6, 3.6, false),
          // Test just outside bounds
          Then.centroid(2, 3)
        ],
        1,
        1
      ),
      test5: Given.Rectangle(
        ["Rotated rectangle"],
        [When.rotate(Math.PI / 2)],
        [
          Then.contains(0, 0, true),
          Then.contains(1, 0, false),
          Then.contains(0, 1, true)
        ],
        1,
        1
      )
    })
  ];
};
var SP_Polygon_test_default = Pure_default(null, spec, imp, interf);
export {
  SP_Polygon_test_default as default,
  imp,
  spec
};

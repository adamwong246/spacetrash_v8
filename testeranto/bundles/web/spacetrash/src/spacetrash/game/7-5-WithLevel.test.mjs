import {
  GameWithLevel,
  SP_2d_Vector,
  SP_Polygon,
  Web_default,
  assert
} from "../../../chunk-4M65ENHY.mjs";
import "../../../chunk-WJBRD6KE.mjs";
import "../../../chunk-HDW26HVJ.mjs";
import "../../../chunk-4LVMNFWN.mjs";
import "../../../chunk-3SR7JMTM.mjs";
import "../../../chunk-FNHHR667.mjs";
import "../../../chunk-UN7UHN4N.mjs";
import "../../../chunk-2J273L3I.mjs";

// src/spacetrash/game/7-5-WithLevel.test.ts
var TestGameWithLevel = class extends GameWithLevel {
  uiHooks = {};
  tiledProjectImport = {};
  constructor(domNode, options = { performanceLogging: false, fps: 60, headless: false }, renderings = /* @__PURE__ */ new Set()) {
    super(domNode, options, renderings);
    this.level = {
      tileLayer: () => ({
        get: () => null
      })
    };
  }
  load() {
  }
  tick(delta) {
  }
};
var imp = {
  suites: {
    Default: "Basic GameWithLevel functionality",
    SpaceGeneration: "Space generation and manipulation",
    PolygonOperations: "Polygon operations and calculations"
  },
  givens: {
    Default: () => new TestGameWithLevel(),
    WithMockLevel: () => {
      const game = new TestGameWithLevel();
      game.level = {
        tileLayer: () => ({
          get: () => ({
            /* mock tile data */
          })
        })
      };
      return game;
    }
  },
  whens: {
    inflateLevel: () => (game) => {
      game.inflateLevel();
      return game;
    },
    addNegativePolygon: (polygon) => (game) => {
      game.NegativeSpace.addPolygons([polygon]);
      return game;
    },
    calculateSpaces: () => (game) => {
      game.NegativeSpaceCollapsed = game.NegativeSpace.union();
      game.Space.addMultiPolygon(game.NegativeSpaceCollapsed);
      game.PositiveSpaceCollapsed = game.Space.difference();
      return game;
    }
  },
  thens: {
    hasNegativeSpace: (expected) => (game) => {
      assert.equal(game.NegativeSpace.polygons.length > 0, expected);
      return game;
    },
    hasPositiveSpace: (expected) => (game) => {
      assert.equal(
        game.PositiveSpaceCollapsed?.polygons?.length > 0 || false,
        expected
      );
      return game;
    },
    spaceCount: (expected) => (game) => {
      assert.equal(game.Space.polygons.length, expected);
      return game;
    },
    negativeSpaceCount: (expected) => (game) => {
      assert.equal(game.NegativeSpace.polygons.length, expected);
      return game;
    },
    polygonCount: (expected) => (game) => {
      const count = game.convexPositive?.length || 0;
      assert.equal(count, expected);
      return game;
    }
  },
  checks: {
    Default: () => new TestGameWithLevel()
  }
};
var interf = {
  beforeAll: async () => {
  },
  beforeEach: async (subject, i, tr, iv) => {
    return i(...iv || []);
  },
  andWhen: async function(s, whenCB, tr, utils) {
    return whenCB(s);
  },
  butThen: async (s, t, tr, pm) => {
    return t(s);
  }
};
var spec = (Suite, Given, When, Then, Check) => {
  const testPolygon = new SP_Polygon(new SP_2d_Vector(0, 0), [
    new SP_2d_Vector(0, 0),
    new SP_2d_Vector(10, 0),
    new SP_2d_Vector(10, 10),
    new SP_2d_Vector(0, 10)
  ]);
  return [
    Suite.Default("Testing basic GameWithLevel operations", {
      test0: Given.Default(
        ["New instance has empty spaces"],
        [],
        [
          Then.hasNegativeSpace(false),
          Then.spaceCount(1),
          // Default space is initialized
          Then.negativeSpaceCount(1)
          // Empty polygon is initialized
        ]
      )
    }),
    Suite.SpaceGeneration("Testing space generation", {
      test0: Given.Default(
        ["Adding negative space polygons"],
        [When.addNegativePolygon(testPolygon)],
        [
          Then.hasNegativeSpace(true),
          Then.negativeSpaceCount(2)
          // Original empty + new polygon
        ]
      ),
      test1: Given.Default(
        ["Calculating space differences"],
        [
          When.addNegativePolygon(testPolygon),
          When.calculateSpaces()
        ],
        [
          Then.hasPositiveSpace(true),
          Then.polygonCount(1)
          // Should have convex partitions
        ]
      )
    }),
    Suite.PolygonOperations("Testing polygon operations", {
      test0: Given.WithMockLevel(
        ["inflateLevel generates spaces"],
        [When.inflateLevel()],
        [
          Then.hasNegativeSpace(true),
          Then.hasPositiveSpace(true),
          Then.polygonCount(1)
          // At least one convex partition
        ]
      )
    })
  ];
};
var WithLevel_test_default = Web_default(null, spec, imp, interf);
export {
  WithLevel_test_default as default,
  imp,
  spec
};

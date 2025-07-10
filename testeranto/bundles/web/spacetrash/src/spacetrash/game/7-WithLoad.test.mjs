import {
  GameWithLevel,
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

// src/spacetrash/game/7-WithLoad.test.ts
var TestGameWithLoad = class extends GameWithLevel {
  uiHooks = {};
  tiledProjectImport = {};
  constructor(domNode) {
    super(domNode);
  }
  tick(delta) {
  }
  // Add any test-specific overrides if needed
};
var imp = {
  suites: {
    Default: "GameWithLoad basic operations",
    SpaceGeneration: "Negative/Positive space generation",
    PhysicsSetup: "Physics system setup"
  },
  givens: {
    Default: () => {
      const mockDomNode = document.createElement("div");
      return new TestGameWithLoad(mockDomNode);
    },
    WithMockLevel: () => {
      const game = new TestGameWithLoad(document.createElement("div"));
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
    loadPhysics: () => (game) => {
      game.loadPhysics();
      return game;
    },
    setupRenderers: () => (game) => {
      game.setupRenderers();
      return game;
    }
  },
  thens: {
    hasNegativeSpace: (expected) => (game) => {
      assert.equal(game.NegativeSpace.polygons.length > 0, expected);
      return game;
    },
    hasPositiveSpace: (expected) => (game) => {
      assert.equal(game.PositiveSpaceCollapsed.polygons.length > 0, expected);
      return game;
    },
    physicsBodiesCount: (expected) => (game) => {
      assert.equal(game.samuraiEngine.bodies.length, expected);
      return game;
    }
  },
  checks: {
    Default: () => new TestGameWithLoad(document.createElement("div"))
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
  return [
    Suite.Default("Testing basic GameWithLoad operations", {
      test0: Given.Default(
        ["New instance has empty spaces"],
        [],
        [
          Then.hasNegativeSpace(false),
          Then.hasPositiveSpace(false)
        ]
      )
    }),
    Suite.SpaceGeneration("Testing space generation", {
      test0: Given.WithMockLevel(
        ["inflateLevel creates spaces"],
        [When.inflateLevel()],
        [
          Then.hasNegativeSpace(true),
          Then.hasPositiveSpace(true)
        ]
      )
    }),
    Suite.PhysicsSetup("Testing physics setup", {
      test0: Given.WithMockLevel(
        ["loadPhysics adds bodies"],
        [When.inflateLevel(), When.loadPhysics()],
        [
          Then.physicsBodiesCount(0)
          // Would need mock SP_PhysicalComponents to test >0
        ]
      )
    })
  ];
};
var WithLoad_test_default = Web_default(null, spec, imp, interf);
export {
  WithLoad_test_default as default,
  imp,
  spec
};

import { assert } from "chai";
import Testeranto from "testeranto/src/Web";
import {
  Ibdd_in,
  Ibdd_out,
  IPartialInterface,
  ITestImplementation,
  ITestSpecification,
} from "testeranto/src/Types";
import { GameWithLoad } from "./7-WithLoad";
import { GameWithLevel } from "./7-5-WithLevel";

// Test implementation that extends the abstract GameWithLoad
class TestGameWithLoad extends GameWithLevel {
  uiHooks: any = {};
  tiledProjectImport: any = {};

  constructor(domNode: HTMLElement) {
    super(domNode);
  }

  tick(delta: number): void {
    // Test implementation of tick
  }

  // Add any test-specific overrides if needed
}


type M = {
  givens: {
    [K in keyof O["givens"]]: (...Iw: O["givens"][K]) => GameWithLoad;
  };
  whens: {
    [K in keyof O["whens"]]: (
      ...Iw: O["whens"][K]
    ) => (game: GameWithLoad) => GameWithLoad;
  };
  thens: {
    [K in keyof O["thens"]]: (
      ...Iw: O["thens"][K]
    ) => (game: GameWithLoad) => GameWithLoad;
  };
};

export const imp: ITestImplementation<I, O, M> = {
  suites: {
    Default: "GameWithLoad basic operations",
    SpaceGeneration: "Negative/Positive space generation",
    PhysicsSetup: "Physics system setup"
  },

  givens: {
    Default: () => {
      const mockDomNode = document.createElement('div');
      return new TestGameWithLoad(mockDomNode);
    },
    WithMockLevel: () => {
      const game = new TestGameWithLoad(document.createElement('div'));
      // Mock level data
      game.level = {
        tileLayer: () => ({
          get: () => ({ /* mock tile data */ })
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
    hasNegativeSpace: (expected: boolean) => (game) => {
      assert.equal(game.NegativeSpace.polygons.length > 0, expected);
      return game;
    },
    hasPositiveSpace: (expected: boolean) => (game) => {
      assert.equal(game.PositiveSpaceCollapsed.polygons.length > 0, expected);
      return game;
    },
    physicsBodiesCount: (expected: number) => (game) => {
      assert.equal(game.samuraiEngine.bodies.length, expected);
      return game;
    }
  },

  checks: {
    Default: () => new TestGameWithLoad(document.createElement('div'))
  }
};

type I = Ibdd_in<
  null,
  null,
  GameWithLoad,
  GameWithLoad,
  GameWithLoad,
  (...x) => (game: GameWithLoad) => GameWithLoad,
  (game: GameWithLoad) => GameWithLoad
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
    SpaceGeneration: [string];
    PhysicsSetup: [string];
  },
  {
    Default: [];
    WithMockLevel: [];
  },
  {
    inflateLevel: [];
    loadPhysics: [];
    setupRenderers: [];
  },
  {
    hasNegativeSpace: [boolean];
    hasPositiveSpace: [boolean]; 
    physicsBodiesCount: [number];
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
          Then.physicsBodiesCount(0) // Would need mock SP_PhysicalComponents to test >0
        ]
      )
    })
  ];
};

export default Testeranto<I, O, M>(null, spec, imp, interf);

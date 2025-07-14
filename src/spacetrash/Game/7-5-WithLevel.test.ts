import { assert } from "chai";
import Testeranto from "testeranto/src/Web";
import {
  Ibdd_in,
  Ibdd_out,
  IPartialInterface,
  ITestImplementation,
  ITestSpecification,
} from "testeranto/src/CoreTypes";
import { GameWithLevel } from "./7-5-WithLevel";
import { SP_Polygon } from "../../demiurge/physics/SP_Polygon";
import { SP_2d_Vector } from "../../demiurge/physics/SP_2d_Vector";

// Minimal test implementation of GameWithLevel
class TestGameWithLevel extends GameWithLevel {
  uiHooks: any = {};
  tiledProjectImport: any = {};

  constructor(
    domNode: HTMLElement,
    options = { performanceLogging: false, fps: 60, headless: false },
    renderings = new Set()
  ) {
    super(domNode, options, renderings);
    // Only mock what's absolutely required for compilation
    this.level = {
      tileLayer: () => ({
        get: () => null,
      }),
    };
  }

  load(): void {}
  tick(delta: number): void {}
}

type M = {
  givens: {
    [K in keyof O["givens"]]: (...Iw: O["givens"][K]) => TestGameWithLevel;
  };
  whens: {
    [K in keyof O["whens"]]: (
      ...Iw: O["whens"][K]
    ) => (game: TestGameWithLevel) => TestGameWithLevel;
  };
  thens: {
    [K in keyof O["thens"]]: (
      ...Iw: O["thens"][K]
    ) => (game: TestGameWithLevel) => TestGameWithLevel;
  };
};

export const imp: ITestImplementation<I, O, M> = {
  suites: {
    Default: "Basic GameWithLevel functionality",
    SpaceGeneration: "Space generation and manipulation",
    PolygonOperations: "Polygon operations and calculations",
  },

  givens: {
    Default: (domnode) => new TestGameWithLevel(domnode),
    WithMockLevel: (domnode) => {
      const game = new TestGameWithLevel(domnode);
      // Mock level data
      game.level = {
        tileLayer: () => ({
          get: () => ({
            /* mock tile data */
          }),
        }),
      };
      return game;
    },
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
    },
  },

  thens: {
    hasNegativeSpace: (expected: boolean) => (game) => {
      assert.equal(game.NegativeSpace.polygons.length > 0, expected);
      return game;
    },
    hasPositiveSpace: (expected: boolean) => (game) => {
      assert.equal(
        game.PositiveSpaceCollapsed?.polygons?.length > 0 || false,
        expected
      );
      return game;
    },
    spaceCount: (expected: number) => (game) => {
      assert.equal(game.Space.polygons.length, expected);
      return game;
    },
    negativeSpaceCount: (expected: number) => (game) => {
      assert.equal(game.NegativeSpace.polygons.length, expected);
      return game;
    },
    polygonCount: (expected: number) => (game) => {
      const count = game.convexPositive?.length || 0;
      assert.equal(count, expected);
      return game;
    },
  },

  checks: {
    Default: (domElement) => new TestGameWithLevel(domElement),
  },
};

type I = Ibdd_in<
  typeof TestGameWithLevel,
  [HTMLElement, typeof TestGameWithLevel],
  TestGameWithLevel,
  TestGameWithLevel,
  (domnode) => TestGameWithLevel,
  (...x) => (game: TestGameWithLevel) => TestGameWithLevel,
  (game: TestGameWithLevel) => TestGameWithLevel
>;

debugger;

const interf: IPartialInterface<I> = {
  beforeAll: async (input) => {
    const rootElement = document.getElementById("root");
    if (!rootElement) throw "there was no html element";
    return [rootElement, input];
  },
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
    PolygonOperations: [string];
  },
  {
    Default: [];
    WithMockLevel: [];
  },
  {
    inflateLevel: [];
    addNegativePolygon: [SP_Polygon];
    calculateSpaces: [];
  },
  {
    hasNegativeSpace: [boolean];
    hasPositiveSpace: [boolean];
    spaceCount: [number];
    negativeSpaceCount: [number];
    polygonCount: [number];
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
  const testPolygon = new SP_Polygon(new SP_2d_Vector(0, 0), [
    new SP_2d_Vector(0, 0),
    new SP_2d_Vector(10, 0),
    new SP_2d_Vector(10, 10),
    new SP_2d_Vector(0, 10),
  ]);

  return [
    Suite.Default("Testing basic GameWithLevel operations", {
      test0: Given.Default(
        ["New instance has empty spaces"],
        [],
        [
          Then.hasNegativeSpace(false),
          Then.spaceCount(1), // Default space is initialized
          Then.negativeSpaceCount(1), // Empty polygon is initialized
        ]
      ),
    }),

    Suite.SpaceGeneration("Testing space generation", {
      test0: Given.Default(
        ["Adding negative space polygons"],
        [When.addNegativePolygon(testPolygon)],
        [
          Then.hasNegativeSpace(true),
          Then.negativeSpaceCount(2), // Original empty + new polygon
        ]
      ),

      test1: Given.Default(
        ["Calculating space differences"],
        [When.addNegativePolygon(testPolygon), When.calculateSpaces()],
        [
          Then.hasPositiveSpace(true),
          Then.polygonCount(1), // Should have convex partitions
        ]
      ),
    }),

    Suite.PolygonOperations("Testing polygon operations", {
      test0: Given.WithMockLevel(
        ["inflateLevel generates spaces"],
        [When.inflateLevel()],
        [
          Then.hasNegativeSpace(true),
          Then.hasPositiveSpace(true),
          Then.polygonCount(1), // At least one convex partition
        ]
      ),
    }),
  ];
};

export default Testeranto<I, O, M>(TestGameWithLevel, spec, imp, interf);

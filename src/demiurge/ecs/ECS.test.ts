import Testeranto from "testeranto/src/Node";
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

import { ECS } from "./ECS";
import { EntityComponent } from "./EntityComponent";
import { Component } from "./Component";
import { TestMapStore } from "./TestMapStore.test";

// Test implementation
type M = {
  givens: {
    [K in keyof O["givens"]]: (...Iw: O["givens"][K]) => ECS;
  };
  whens: {
    [K in keyof O["whens"]]: (
      ...Iw: O["whens"][K]
    ) => (ecs: ECS, utils: PM) => Promise<ECS>;
  };
  thens: {
    [K in keyof O["thens"]]: (
      ...Iw: O["thens"][K]
    ) => (ecs: ECS, utils: PM) => Promise<ECS>;
  };
};

export const imp: ITestImplementation<I, O, M> = {
  suites: {
    Default: "Basic ECS operations",
  },

  givens: {
    Default: () => {
      class TestECS extends ECS {
        components = {
          TestComponent: new TestMapStore<any>(),
        };
      }
      return new TestECS({
        performanceLogging: false,
        fps: 60,
        headless: true,
      });
    },
    WithComponent: (componentName: string) => {
      class TestECS extends ECS {
        components = {
          [componentName]: new TestMapStore<any>(),
        };
      }
      return new TestECS({
        performanceLogging: false,
        fps: 60,
        headless: true,
      });
    },
  },

  whens: {
    addEntity: (entity: EntityComponent) => (ecs, _utils) => {
      ecs.setEntitiesComponent([entity]);
      return Promise.resolve(ecs);
    },
    addComponent:
      (entityId: number, component: Component<any, any>) => (ecs, _utils) => {
        ecs.addComponent(entityId, component);
        return Promise.resolve(ecs);
      },
  },

  thens: {
    entityCount: (expected: number) => (ecs, _utils) => {
      assert.equal(
        ecs.entities.size,
        expected,
        `Expected ${expected} entities`
      );
      return Promise.resolve(ecs);
    },
    hasComponent:
      (entityId: number, componentName: string, expected: boolean) =>
      (ecs, _utils) => {
        const components = ecs.getComponents(entityId);
        const hasComp = components.some(
          (c) => c.constructor.name === componentName
        );
        assert.equal(
          hasComp,
          expected,
          `Entity ${entityId} should ${
            expected ? "" : "not "
          }have component ${componentName}`
        );
        return Promise.resolve(ecs);
      },
    componentCount: (entityId: number, expected: number) => (ecs, _utils) => {
      const components = ecs.getComponents(entityId);
      assert.equal(
        components.length,
        expected,
        `Entity ${entityId} should have ${expected} components`
      );
      return Promise.resolve(ecs);
    },
  },

  checks: {
    Default: () => {
      class TestECS extends ECS {
        components = {
          TestComponent: new TestMapStore<any>(),
        };
      }
      return new TestECS({
        performanceLogging: false,
        fps: 60,
        headless: true,
      });
    },
  },
};

// Test types
type I = Ibdd_in<
  null,
  null,
  ECS,
  ECS,
  ECS,
  (...x: unknown[]) => (p: ECS, utils: IPM) => Promise<ECS>,
  (p: ECS, utils: IPM) => Promise<ECS>
>;

const interf: IPartialInterface<I> = {
  beforeAll: async () => {},
  beforeEach: async (subject, i, tr, iv: unknown[]) => {
    return i(...(iv || []));
  },
  andWhen: async function (s, whenCB, tr, utils) {
    return whenCB(s, utils) as Promise<ECS>;
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
    WithComponent: [string];
  },
  {
    addEntity: [EntityComponent];
    addComponent: [number, Component<any, any>];
  },
  {
    entityCount: [number];
    hasComponent: [number, string, boolean];
    componentCount: [number, number];
  },
  {
    Default: [];
  }
>;

// Test specifications
export const spec: ITestSpecification<I, O> = (
  Suite,
  Given,
  When,
  Then,
  Check
) => {
  class TestComponent extends Component<any, any> {}
  class AnotherComponent extends Component<any, any> {}

  return [
    Suite.Default("Testing ECS basic operations", {
      test0: Given.Default(
        ["New ECS has no entities"],
        [],
        [Then.entityCount(0)],
        null
      ),

      test1: Given.WithComponent(
        ["Adding entity with component"],
        [
          When.addEntity(
            new EntityComponent(null as any, [new TestComponent()])
          ),
        ],
        [
          Then.entityCount(1),
          Then.hasComponent(0, "TestComponent", true),
          Then.componentCount(0, 1),
        ]
      ),

      test2: Given.WithComponent(
        ["Adding component to existing entity"],
        [
          When.addEntity(new EntityComponent(null as any, [])),
          When.addComponent(0, new TestComponent()),
        ],
        [
          Then.entityCount(1),
          Then.hasComponent(0, "TestComponent", true),
          Then.componentCount(0, 1),
        ]
      ),

      test3: Given.WithComponent(
        ["Entity with multiple components"],
        [
          When.addEntity(
            new EntityComponent(null as any, [
              new TestComponent(),
              new AnotherComponent(),
            ])
          ),
        ],
        [
          Then.entityCount(1),
          Then.hasComponent(0, "TestComponent", true),
          Then.hasComponent(0, "AnotherComponent", true),
          Then.componentCount(0, 2),
        ]
      ),
    }),
  ];
};

export default Testeranto<I, O, M>(
  null as unknown as I["input"],
  spec,
  imp,
  interf
);

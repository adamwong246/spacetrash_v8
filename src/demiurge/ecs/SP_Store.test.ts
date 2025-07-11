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
import { TestMapStore } from "./TestMapStore.test";
import Testeranto from "testeranto/src/Pure";

// Minimal test component
class TestComponent {
  constructor(public value: string) {}
}

// Test implementation
type M = {
  givens: {
    [K in keyof O["givens"]]: (...Iw: O["givens"][K]) => SP_MapStore<TestComponent>;
  };
  whens: {
    [K in keyof O["whens"]]: (
      ...Iw: O["whens"][K]
    ) => (store: SP_MapStore<TestComponent>, utils: PM) => Promise<SP_MapStore<TestComponent>>;
  };
  thens: {
    [K in keyof O["thens"]]: (
      ...Iw: O["thens"][K]
    ) => (store: SP_MapStore<TestComponent>, utils: PM) => Promise<SP_MapStore<TestComponent>>;
  };
};

export const imp: ITestImplementation<I, O, M> = {
  suites: {
    Default: "Basic SP_MapStore operations",
  },

  givens: {
    Empty: () => new TestMapStore<TestComponent>(),
    WithComponent: (eid: number, value: string) => {
      const store = new TestMapStore<TestComponent>();
      store.make(new TestComponent(value), eid);
      return store;
    },
  },

  whens: {
    addComponent: (eid: number, value: string) => (store) => {
      store.make(new TestComponent(value), eid);
      return Promise.resolve(store);
    },
    updateComponent: (eid: number, newValue: string) => (store) => {
      const component = store.take(eid);
      component.value = newValue;
      store.update(component, eid);
      return Promise.resolve(store);
    },
  },

  thens: {
    hasComponent: (eid: number, expected: boolean) => (store) => {
      const exists = !!store.get(eid);
      assert.equal(exists, expected, `Component ${eid} should ${expected ? '' : 'not '}exist`);
      return Promise.resolve(store);
    },
    componentValue: (eid: number, expected: string) => (store) => {
      const component = store.take(eid);
      assert.equal(component.value, expected, `Component ${eid} should have value "${expected}"`);
      return Promise.resolve(store);
    },
  },

  checks: {
    Default: () => new TestMapStore<TestComponent>(),
  },
};

// Test types
type I = Ibdd_in<
  null,
  null,
  TestMapStore<TestComponent>,
  TestMapStore<TestComponent>, 
  TestMapStore<TestComponent>,
  (...x: unknown[]) => (p: TestMapStore<TestComponent>, utils: IPM) => Promise<TestMapStore<TestComponent>>,
  (p: TestMapStore<TestComponent>, utils: IPM) => Promise<TestMapStore<TestComponent>>
>;

const interf: IPartialInterface<I> = {
  beforeAll: async () => {},
  beforeEach: async (subject, i, tr, iv: unknown[]) => {
    return i(...(iv || []));
  },
  andWhen: async function (s, whenCB, tr, utils) {
    return whenCB(s, utils) as Promise<SP_MapStore<TestComponent>>;
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
    Empty: [];
    WithComponent: [number, string];
  },
  {
    addComponent: [number, string];
    updateComponent: [number, string];
  },
  {
    hasComponent: [number, boolean];
    componentValue: [number, string];
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
  return [
    Suite.Default("Testing SP_MapStore basic operations", {
      test0: Given.Empty(
        ["Empty store has no components"],
        [],
        [Then.hasComponent(1, false)],
        null
      ),

      test1: Given.WithComponent(
        ["Store with component"],
        [1, "initial"],
        [
          Then.hasComponent(1, true),
          Then.componentValue(1, "initial")
        ],
        null
      ),

      test2: Given.Empty(
        ["Add and verify component"],
        [
          When.addComponent(1, "test"),
        ],
        [
          Then.hasComponent(1, true),
          Then.componentValue(1, "test")
        ],
        null
      ),

      test3: Given.WithComponent(
        ["Update component"],
        [1, "initial"],
        [
          When.updateComponent(1, "updated"),
        ],
        [
          Then.componentValue(1, "updated")
        ],
        null
      ),
    }),
  ];
};

export default Testeranto<I, O, M>(null as unknown as I['input'], spec, imp, interf);

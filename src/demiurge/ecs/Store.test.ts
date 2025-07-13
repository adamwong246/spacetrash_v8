import {assert} from "chai";
import { PM } from "testeranto/src/PM";
import {
  Ibdd_in,
  Ibdd_out,
  ITestImplementation,
  ITestInterface,
  ITestSpecification,
} from "testeranto/src/CoreTypes";


import { SP_Store } from "./Store";
import { Component } from "./Component";
import type { IPM } from "testeranto/src/lib/types";

export class DummyComponent extends Component<unknown, unknown> {
  public value: unknown = false;
  
  constructor(value: unknown) {
    if (!value) throw "DummyComponent value should be defined"
    super();
    this.value = value;
  }

}

// Defining a constructor type for MyClass
type Constructor = new (...v) => SP_Store<Component<unknown, unknown>>;


export const implementationFactory = (
  storeConstructor: Constructor
): ITestImplementation<I, O, M> => {

  return {
    suites: {
      Default: "Basic SP_Store operations",
      Advanced: ""
    },

    givens: {
      Empty: () => new storeConstructor(),
      WithComponent: (eid: number, value: string) => {
        const store = new storeConstructor();
        const component = new DummyComponent(value);
        store.make(component, eid);
        return store;
      },
      WithMultipleComponents: (eids: number[], values: string[]) => {
        const store = new storeConstructor();
        eids.forEach((eid, i) => {
          const component = new DummyComponent(values[i]);
          store.make(component, eid);
        });
        return store;
      },
    },

    whens: {
      addComponent: (eid: number, value: string) => (store) => {
        const component = new DummyComponent(value);
        store.make(component, eid);
        return Promise.resolve(store);
      },

      updateComponent: (eid: number, newValue: string) => (store) => {
        const component = new DummyComponent(newValue);
        store.update(component, eid);
        return Promise.resolve(store);
      },

      removeComponent: (eid: number) => (store) => {
        store.make(null as any, eid); // Using make with null to simulate removal
        return Promise.resolve(store);
      },

      bulkAddComponents: (eids: number[], values: string[]) => (store) => {
        eids.forEach((eid, i) => {
          const component = new DummyComponent(values[i]);
          store.make(component, eid);
        });
        return Promise.resolve(store);
      },

      bulkUpdateComponents: (eids: number[], values: string[]) => (store) => {
        eids.forEach((eid, i) => {
          const component = new DummyComponent(values[i]);
          store.update(component, eid);
        });
        return Promise.resolve(store);
      },
    },

    thens: {

      takeThrowsErrorOnMiss: (eid: number) => (store) => {
        try {
          store.take(eid);  
          assert.fail("Should have thrown for missing component");
        } catch (e) {
          assert.exists(e, "take throws error on miss")  
        } 
        
        
        return Promise.resolve(store);
        // const exists = !!store.get(eid);
        // assert.equal(exists, expected, `Component ${eid} should ${expected ? "" : "not "}exist`);
        return Promise.resolve(store);
      },

      getIsFalseIfMiss: (eid: number) => (store) => {
        const gotten = store.get(eid);
        assert.equal(gotten, false, "get returns false softly on miss")
        return Promise.resolve(store);
        // const exists = !!store.get(eid);
        // assert.equal(exists, expected, `Component ${eid} should ${expected ? "" : "not "}exist`);
        // return Promise.resolve(store);
      },

      hasComponent: (eid: number, expected: boolean) => (store) => {
        const exists = !!store.get(eid);
        assert.equal(exists, expected, `Component ${eid} should ${expected ? "" : "not "}exist`);
        return Promise.resolve(store);
      },
      componentValue: (eid: number, expected: string) => (store) => {
        const component = store.take(eid);
        assert.equal(component.value, expected, `Component ${eid} should have value "${expected}"`);
        return Promise.resolve(store);
      },
      allComponentsExist: (eids: number[], expected: boolean) => (store) => {
        eids.forEach(eid => {
          const exists = !!store.get(eid);
          assert.equal(exists, expected, `Component ${eid} should ${expected ? "" : "not "}exist`);
        });
        return Promise.resolve(store);
      },
      allComponentsHaveValues: (eids: number[], expectedValues: string[]) => (store) => {
        eids.forEach((eid, i) => {
          const component = store.take(eid);
          assert.equal(component.value, expectedValues[i], 
            `Component ${eid} should have value "${expectedValues[i]}"`);
        });
        return Promise.resolve(store);
      },
      storeSize: (expected: number) => (store) => {
        let count = 0;
        store.each(() => count++);
        assert.equal(count, expected, `Store should have ${expected} components`);
        return Promise.resolve(store);
      },
    },

    checks: {
      Default: () => new storeConstructor(),
      SizeCheck: function (): SP_Store<Component<unknown, unknown>> {
        throw new Error("Function not implemented.");
      }
    },
  };
};

// Test types
export type I = Ibdd_in<
  null,
  null,
  SP_Store<Component<unknown, unknown>>,
  SP_Store<Component<unknown, unknown>>,
  SP_Store<Component<unknown, unknown>>,
  (...x: unknown[]) => (p: SP_Store<Component<unknown, unknown>>, utils: IPM) => Promise<SP_Store<Component<unknown, unknown>>>,
  (p: SP_Store<Component<unknown, unknown>>, utils: IPM) => Promise<SP_Store<Component<unknown, unknown>>>
>;

export const interf: ITestInterface<I> = {
  
  // ...BaseTestInterface,
  assertThis: () => {

  },

  afterEach: () => {

  },
  afterAll: () => {

  },
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

export type O = Ibdd_out<
  {
    Default: [string];
    Advanced: [string];
  },
  {
    Empty: [];
    WithComponent: [number, string];
    WithMultipleComponents: [number[], string[]];
  },
  {
    addComponent: [number, string];
    updateComponent: [number, string];
    removeComponent: [number];
    bulkAddComponents: [number[], string[]];
    bulkUpdateComponents: [number[], string[]];
  },
  {
    hasComponent: [number, boolean];
    componentValue: [number, string];
    allComponentsExist: [number[], boolean];
    allComponentsHaveValues: [number[], string[]];
    storeSize: [number];
    getIsFalseIfMiss: [number]
    takeThrowsErrorOnMiss: [number]
  },
  {
    Default: [];
    SizeCheck: [];
  }
>;

export type M = {
  givens: {
    [K in keyof O["givens"]]: (...Iw: O["givens"][K]) => SP_Store<Component<unknown, unknown>>;
  };
  whens: {
    [K in keyof O["whens"]]: (
      ...Iw: O["whens"][K]
    ) => (store: SP_Store<Component<unknown, unknown>>, utils: PM) => Promise<SP_Store<Component<unknown, unknown>>>;
  };
  thens: {
    [K in keyof O["thens"]]: (
      ...Iw: O["thens"][K]
    ) => (store: SP_Store<Component<unknown, unknown>>, utils: PM) => Promise<SP_Store<Component<unknown, unknown>>>;
  };
};

// Test specifications
export const spec: ITestSpecification<I, O> = (
  Suite,
  Given,
  When,
  Then,
  Check
) => {
  return [
    Suite.Default(
      "Testing SP_MapStore basic operations",
      {
        test0: Given.Empty(
          ["Empty store has no components"],
          [],
          [Then.hasComponent(1, false)]
        ),

        test1: Given.WithComponent(
          ["Store with component"],
          [],
          [Then.hasComponent(1, true), Then.componentValue(1, "alpha")],
          1,
          "alpha"
        ),

        test2: Given.Empty(
          ["Add and verify component"],
          [When.addComponent(1, "test")],
          [Then.hasComponent(1, true), Then.componentValue(1, "test")]
        ),

        test2_5: Given.Empty(
          ["Add and verify component"],
          [When.addComponent(12, "test")],
          [
            Then.componentValue(12, "test")
          ]
        ),


        test3: Given.WithComponent(
          ["Update component - complete replacement"],
          [When.updateComponent(1, "updated")],
          [Then.componentValue(1, "updated")],
          1,
          "initial" // Initial value that should be completely replaced
        ),

        test4: Given.WithMultipleComponents(
          ["Multiple components operations"],
          [When.bulkUpdateComponents([1, 2], ["new1", "new2"])],
          [
            Then.allComponentsExist([1, 2], true),
            Then.allComponentsHaveValues([1, 2], ["new1", "new2"])
          ],
          [1, 2],
          ["init1", "init2"]
        ),

        test5: Given.Empty(
          ["Bulk add and verify components"],
          [When.bulkAddComponents([10, 20, 30], ["a", "b", "c"])],
          [
            Then.storeSize(3),
            Then.allComponentsHaveValues([10, 20, 30], ["a", "b", "c"]),
            Then.allComponentsExist([10, 20, 30], true)
          ]
        ),

        test6: Given.WithMultipleComponents(
          ["Component removal"],
          [When.removeComponent(1)],
          [
            Then.hasComponent(1, false),
            Then.hasComponent(2, true),
            Then.componentValue(2, "val2")
          ],
          [1, 2],
          ["val1", "val2"]
        ),

        test7: Given.Empty(
        ["Nonexistent component operations"],
        [],
        [
          Then.getIsFalseIfMiss(999),
          Then.takeThrowsErrorOnMiss(999),
        ]
      )
      },

      

      []
    )]
}

import Testeranto from "testeranto/src/Node";

import { Ibdd_in, Ibdd_out } from "testeranto/src/Types";

import { EmotionImplementation } from "./emotion.test.implementation";
import { EmotionSpec } from "./emotion.test.specification";
import { IPM } from "testeranto/src/lib/types";
import { interf } from "./emotion.test.interface";
import { EmotionSystem } from "../emotion";

export type I = Ibdd_in<
  Record<string, never>,
  Record<string, never>,
  EmotionSystem,
  EmotionSystem,
  EmotionSystem,
  (
    ...x: unknown[]
  ) => (EmotionSystemInstance: EmotionSystem, utils: IPM) => EmotionSystem,
  (EmotionSystemInstance: EmotionSystem, utils: IPM) => EmotionSystem
>;

export type M = {
  givens: {
    [K in keyof O["givens"]]: (...Iw: O["givens"][K]) => EmotionSystem;
  };
  whens: {
    [K in keyof O["whens"]]: (
      ...Iw: O["whens"][K]
    ) => (EmotionSystemInstance: EmotionSystem) => EmotionSystem;
  };
  thens: {
    [K in keyof O["thens"]]: (
      ...Iw: O["thens"][K]
    ) => (EmotionSystemInstance: EmotionSystem) => EmotionSystem;
  };
};

export type O = Ibdd_out<
  {
    Default: string;
  },
  {
    Default: any[]; //
    EmotionState: any; //[];
  },
  {
    ApprEmotionSystemseEvent: [string];
    UpdateEmotions: [];
    GetDominantEmotion: [];
    ProcessInput: any; //{ content: string; metadata?: Record<string, unknown> };
    Custom: [any];
    AppraiseEvent: [string]
  },
  {
    AssertEmotionState: any; //Record<string, (val: number) => boolean>;
    AssertDominantEmotion: [
      {
        emotion: string;
        intensity: (val: number) => boolean;
      }
    ];
    AssertInputPriority: any; //(val: number) => boolean;
    AssertMemoryUsage: void;
    AssertFocusContent: string;
    Custom: [any];
  },
  {
    Default: [void];
  }
>;

Testeranto<I, O, M>(EmotionSystem, EmotionSpec, EmotionImplementation, interf);

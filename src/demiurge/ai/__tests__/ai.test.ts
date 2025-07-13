import Testeranto from "testeranto/src/Node";

import { impl} from "./ai.test.implementation";
import { spec } from "./ai.test.specification";
import { interf } from "./ai.test.interface";
import { ai } from "../ai";
import { Ibdd_in, Ibdd_out } from "testeranto/src/CoreTypes";
import { IPM } from "testeranto/src/lib/types";

export type I = Ibdd_in<
  Record<string, never>,
  Record<string, never>, 
  ai,
  ai,
  ai,
  (...x: unknown[]) => (aiInstance: ai, utils: IPM) => ai,
  (aiInstance: ai, utils: IPM) => ai
  >;

export type M = {
  givens: {
    [K in keyof O["givens"]]: (...Iw: O["givens"][K]) => ai;
  };
  whens: {
    [K in keyof O["whens"]]: (
      ...Iw: O["whens"][K]
    ) => (aiInstance: ai) => ai;
  };
  thens: {
    [K in keyof O["thens"]]: (
      ...Iw: O["thens"][K]
    ) => (aiInstance: ai) => ai;
  };
};

export type O = Ibdd_out<
  // suite
  {
    Default: [string];
  },
  // given
  {
    Default;
  },
  {
    // Register each When here
    AddGoal: [string, number];
    AddFinancialData: [];
    AddResearchPaper: []; 
    AddSafetyAlert: [];
    AddToMemory: [unknown, boolean?];
    ClearMemory: [];
    CreatePlan: [string, string[]];
    GetMemoryUsage: [];
    GetMode: [];
    ProcessInput: [unknown, number?];
    ProcessInternalInput: [string, number]
    ProcessMessages: []
    RecallFromMemory: [number];
    SendMessage: [string];
    SendMessageTo: [string, ai];
    SetMode: ["safe" | "unsafe"];
    UpdateFocus: [];
  },
  {
    // Register each Then here
    AddGoal: any;
    AddToMemory: [string];
    AssertCurrentGoal: [string];
    AssertDrives: [(drives: string[]) => void];
    AssertEmotion: [string, number];
    AssertFocusContent: [unknown];
    AssertFocusPriority: [number],
    AssertMemoryLimit: [number];
    AssertMemoryUsage: [number];
    AssertMessageInMemory: [string|RegExp];
    AssertNoFocus: [];
    AssertOverflowItem: [number, number];
    AssertResponseTo: [string, RegExp]
    AssertSafetyPrioritized: [];
    ClearAllMemory: [];
    ClearMemory: [];
    CreatePlan: any;
    ExecutePlanStep: [(result: string) => void];
    ExplainPlan: [(result: string) => void];
    GetEmotion: [string];
    GetGreetingLength: [number];
    GetMemoryUsage: [number?];
    GetMode: [];
    RecallFromMemory: [number];
    SayGreeting: [string];
    SendMessage: [string, (response: string) => void];
    SetWorkingMemoryLimit: [number];
    TheLengthOfOverFlowMemoryIs: [number]
    UnauthorizedModeChange: [];
    UpdateFocus: []
    VerifyDrivePrioritization: [];
    VerifySafeMode: [];
    
    
  },
  {
    //
    Default: [];
  }
  >;

Testeranto<I, O, M>(
  ai,
  spec,
  impl,
  interf,
);

import type { Ibdd_in, Ibdd_out } from "testeranto/src/CoreTypes";
import { ai } from "../src/ai";

export type I = Ibdd_in<
  null,
  null,
  ai,
  ai,
  ai,
  (...x: any) => (aiInstance: ai) => ai,
  (aiInstance: ai) => ai
>;

export type O = Ibdd_out<
  { Default: [string]; DriveDecay: [string] },
  { Default: []; WithLowDrive: [string] },
  { Tick: [number]; SetDrive: [string, number] },
  { 
    DriveValue: [string, number]; 
    DriveDecayed: [string, number];
    DriveAboveThreshold: [string];
    DriveBelowThreshold: [string];
  },
  { Default: [] }
>;

export type M = {
  givens: {
    [K in keyof O["givens"]]: (...args: O["givens"][K]) => ai;
  };
  whens: {
    [K in keyof O["whens"]]: (
      ...args: O["whens"][K]
    ) => (aiInstance: ai) => ai;
  };
  thens: {
    [K in keyof O["thens"]]: (
      ...args: O["thens"][K]
    ) => (aiInstance: ai) => ai;
  };
};

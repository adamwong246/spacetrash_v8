import type { ITestImplementation, Ibdd_in, Ibdd_out } from "testeranto/src/CoreTypes";
import { ai } from "../ai";
import assert from "assert";

type I = Ibdd_in<
  null, // IInput
  ai,   // ISubject 
  ai,   // IStore
  ai,   // ISelection
  (initializer?: () => ai) => ai, // IGiven
  (...args: unknown[]) => (aiInstance: ai, tr: unknown, utils: unknown) => Promise<ai>, // IWhen
  (...args: unknown[]) => (aiInstance: ai, utils: unknown) => ai // IThen
>;

type O = Ibdd_out<
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

export const DriveTesterantoBaseTestImplementation: ITestImplementation<I, O> = {
  suites: {
    Default: "Default drive tests",
    DriveDecay: "Drive decay behavior tests"
  },

  givens: {
    Default: () => {
      const instance = new ai("safe");
      // Use public methods to set initial state
      instance.sendMessage(`inform drives ${JSON.stringify({
        money: 50,
        knowledge: 50,
        safety: 50,
        progeny: 50,
        integrity: 50
      })}`);
      return instance;
    },
    WithLowDrive: (drive: string) => {
      const instance = new ai("safe");
      // Use public methods to set low drive state
      instance.sendMessage(`inform drives ${JSON.stringify({
        [drive]: instance.sendMessage(`query drive_thresholds`)[drive] - 1
      })}`);
      return instance;
    }
  },

  whens: {
    Tick: (seconds: number) => async (aiInstance) => {
      console.log(`[TEST_DEBUG] Starting Tick with ${seconds} seconds`);
      
      // Store original time function
      const originalNow = Date.now;
      const baseTime = originalNow();
      const targetTime = baseTime + (seconds * 1000);
      
      // Override Date.now for test
      Date.now = () => targetTime;
      
      console.log(`[TIMING] Simulating ${seconds}s from ${baseTime} to ${targetTime}`);
      aiInstance.tick();
      
      // Restore original Date.now
      Date.now = originalNow;
      
      return Promise.resolve(aiInstance);
    },
    SetDrive: (drive: string, value: number) => (aiInstance) => {
      aiInstance._drives[drive] = value;
      return aiInstance;
    }
  },

  thens: {
    DriveValue: (drive: string, expected: number) => (aiInstance) => {
      assert.equal(
        aiInstance._drives[drive], 
        expected,
        `Expected ${drive} drive to be ${expected}, got ${aiInstance._drives[drive]}`
      );
      return aiInstance;
    },
    DriveDecayed: (drive: string, minDecayFactor: number) => (aiInstance) => {
      console.log(`[DECAY_TEST] Testing ${drive} drive decay`);
      const initial = aiInstance._drives[drive];
      const rate = aiInstance._driveDecayRates[drive];
      const minDecay = rate * minDecayFactor;
      console.log(`[DECAY_TEST] Initial: ${initial.toFixed(2)}, Rate: ${rate.toFixed(4)}/s, MinDecay: ${minDecay.toFixed(4)}`);
      
      aiInstance.tick();
      
      const decayed = aiInstance._drives[drive];
      const actualDecay = initial - decayed;
      
      console.log(`[DECAY_TEST] Decayed to: ${decayed.toFixed(2)}`);
      console.log(`[DECAY_TEST] Actual decay: ${actualDecay.toFixed(4)} vs Minimum: ${minDecay.toFixed(4)}`);
      
      assert.ok(
        actualDecay >= minDecay * 0.8, // Allow 20% tolerance
        `Drive ${drive} (rate: ${rate.toFixed(4)}/s) should decay by at least ${minDecay.toFixed(4)} (was ${actualDecay.toFixed(4)}). ` +
        `Initial: ${initial.toFixed(2)}, Decayed: ${decayed.toFixed(2)}`
      );
      return aiInstance;
    },
    DriveAboveThreshold: (drive: string) => (aiInstance) => {
      const threshold = aiInstance._driveThresholds[drive];
      const value = aiInstance._drives[drive];
      assert.ok(
        value > threshold,
        `${drive} should be above threshold (${threshold}), was ${value}`
      );
      return aiInstance;
    },
    DriveBelowThreshold: (drive: string) => (aiInstance) => {
      const threshold = aiInstance._driveThresholds[drive];
      const value = aiInstance._drives[drive];
      assert.ok(
        value <= threshold,
        `${drive} should be below threshold (${threshold}), was ${value}`
      );
      return aiInstance;
    }
  },

  checks: {
    Default: () => new ai("safe")
  }
};

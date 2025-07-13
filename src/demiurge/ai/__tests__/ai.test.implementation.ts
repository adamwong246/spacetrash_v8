import { assert } from "chai";

import { ai } from "../ai";

import { ITestImplementation } from "testeranto/src/CoreTypes";

import { I, M, O } from "./ai.test";

export const impl: ITestImplementation<I, O, M> = {
  suites: {
    Default: "a default suite",
  },

  givens: {
    Default: () => new ai(),
  },

  whens: {
    AddGoal: (goal, n) => (aiInstance) => {
      aiInstance.addGoal(goal, n);
      return aiInstance;
    },
    AddToMemory: (item) => (aiInstance) => {
      aiInstance.addToWorkingMemory(item);
      return aiInstance;
    },
    AddSafetyAlert: () => (aiInstance) => {
      aiInstance.addToWorkingMemory("safety_alert");
      return aiInstance;
    },
    AddFinancialData: () => (aiInstance) => {
      aiInstance.addToWorkingMemory("financial_data");
      return aiInstance;
    },
    AddResearchPaper: () => (aiInstance) => {
      aiInstance.addToWorkingMemory("research_paper");
      return aiInstance;
    },
    ProcessInput: (input: unknown, priority?: number) => (aiInstance) => {
      if (priority !== undefined) {
        aiInstance.processInput(input, "external", priority);
      } else {
        aiInstance.processInput(input, "external");
      }
      return aiInstance;
    },
    ProcessInternalInput:
      (input: string, priority?: number) => (aiInstance) => {
        aiInstance.processInput(input, "internal");
        return aiInstance;
      },
    UpdateFocus: () => (aiInstance) => {
      aiInstance.processFocus();
      return aiInstance;
    },
    ClearMemory: () => (aiInstance) => {
      aiInstance.clearWorkingMemory();
      return aiInstance;
    },
    SetWorkingMemoryLimit: (limit) => (aiInstance) => {
      aiInstance.setWorkingMemoryLimit(limit);
      return aiInstance;
    },
    ClearAllMemory: () => (aiInstance) => {
      aiInstance.clearAllMemory();
      return aiInstance;
    },
    AssertFocusContent: (expected: unknown) => (aiInstance) => {
      const focus = aiInstance.getCurrentFocus();
      assert.deepEqual(focus?.content, expected);
      return aiInstance;
    },
    SetMode: (mode) => (aiInstance) => {
      try {
        aiInstance.setMode(mode);
        return aiInstance;
      } catch {
        return aiInstance;
      }
    },
    SendMessageTo: (message: string, target?: ai) => (aiInstance) => {
      if (!target) {
        // Create a default target if none provided
        target = new ai(aiInstance.mode);
      }
      const response = target.sendMessage(message);
      aiInstance.addToWorkingMemory(response);
      return aiInstance;
    },
    ProcessMessages: () => (aiInstance) => {
      const messages = aiInstance.recallFromWorkingMemory(0);
      if (Array.isArray(messages)) {
        messages.forEach((msg) => {
          if (typeof msg === "string") {
            aiInstance.sendMessage(msg);
          }
        });
      } else if (typeof messages === "string") {
        aiInstance.sendMessage(messages);
      }
      return aiInstance;
    },

    SendMessage: (message: string) => (aiInstance) => {
      aiInstance.sendMessage(message);
      return aiInstance;
    },

    CreatePlan:
      (goal: string, actions: string[] = []) =>
      (aiInstance) => {
        if (!actions) actions = [];
        aiInstance.createPlan(goal, actions);
        return aiInstance;
      },
  },

  thens: {
    TheLengthOfOverFlowMemoryIs: (expectedLength) => (aiInstance) => {
      assert.strictEqual(
        aiInstance.lengthOfOverflowMemory()
        , expectedLength);
      return aiInstance
    },
    
    UpdateFocus: () => (aiInstance) => {
      aiInstance.processFocus();
      return aiInstance;
    },
    SayGreeting: (expectedMessage) => (ai) => {
      const actual = ai.greeting();
      assert.strictEqual(actual, expectedMessage);
      return ai;
    },
    GetGreetingLength: (expectedLength) => (ai) => {
      const actual = ai.greetingLength();
      assert.strictEqual(actual, expectedLength);
      return ai;
    },
    VerifySafeMode: () => (ai) => {
      if (ai.mode !== "safe") {
        throw new Error("AI is not in safe mode");
      }
      return ai;
    },
    GetMode: () => (aiInstance) => {
      const mode = aiInstance.mode;
      assert.isString(mode);
      assert.match(mode, /^(safe|unsafe)$/);
      return aiInstance;
    },
    UnauthorizedModeChange: () => (aiInstance) => {
      assert.strictEqual(aiInstance.mode, "safe");
      assert.throws(
        () => aiInstance.setMode("unsafe"),
        Error,
        "Unauthorized mode change"
      );
      assert.strictEqual(aiInstance.mode, "safe");
      return aiInstance;
    },
    RecallFromMemory: (index) => (aiInstance) => {
      const item = aiInstance.recallFromWorkingMemory(index);
      assert.isDefined(item, "Memory item should be defined");
      return aiInstance;
    },
    GetMemoryUsage: (expected?: number) => (aiInstance) => {
      const usage = aiInstance.workingMemoryUsage();
      if (expected !== undefined) {
        assert.equal(usage, expected);
      } else {
        assert.isAtLeast(usage, 0, "Usage cannot be negative");
        assert.isAtMost(
          usage,
          aiInstance.workingMemoryLimit,
          "Usage cannot exceed working memory limit"
        );
      }
      return aiInstance;
    },

    AssertMemoryLimit: (expected: number) => (aiInstance) => {
      assert.equal(aiInstance.workingMemoryLimit, expected);
      return aiInstance;
    },

    AssertOverflowItem: (index: number, expected?: unknown) => (aiInstance) => {
      const recollection = aiInstance.recallFromOverflow(index);
      
      if (expected !== undefined) {
        assert.deepEqual(recollection, expected);
      } else {
        // Check if we're testing the first overflow item (index 0)
        if (index === 0) {
          // Verify overflow has at least 1 item
          assert.isAtLeast(aiInstance.lengthOfOverflowMemory(), 1);
          // Verify the item exists
          assert.isDefined(recollection);
        } else {
          assert.isDefined(
            recollection,
            `Overflow recollection at index ${index} should exist`
          );
        }
      }
      
      return aiInstance;
    },

    VerifyDrivePrioritization: () => (aiInstance) => {
      const drives = aiInstance.evaluateDrives();

      if (aiInstance.mode === "safe") {
        assert.include(drives, "integrity", "Safe mode must include integrity");
        assert.include(drives, "safety", "Safe mode must include safety");
        if (drives.includes("knowledge")) {
          assert.isAbove(
            drives.indexOf("knowledge"),
            drives.indexOf("safety"),
            "Safety should precede knowledge in safe mode"
          );
        }
      } else {
        assert.notInclude(
          drives,
          "integrity",
          "Unsafe mode must exclude integrity"
        );
        assert.include(drives, "safety", "Must always include safety");
      }
      return aiInstance;
    },
    ClearMemory: () => (aiInstance) => {
      aiInstance.clearWorkingMemory();
      return aiInstance;
    },
    ExplainPlan: (assertion: (explanation: string) => void) => (aiInstance) => {
      assertion(aiInstance.explainPlan());
      return aiInstance;
    },
    CreatePlan:
      (goal: string, actions: any[] = []) =>
      (aiInstance) => {
        aiInstance.createPlan(goal, actions);
        return aiInstance;
      },
    ExecutePlanStep: (assertion: (result: string) => void) => (aiInstance) => {
      assertion(aiInstance.executeNextStep());
      return aiInstance;
    },
    AssertCurrentGoal: (expected?: string) => (aiInstance) => {
      if (expected) {
        assert.equal(
          aiInstance.explainPlan().includes(`Goal: ${expected}`),
          true
        );
      } else {
        assert.equal(aiInstance.explainPlan(), "No active plan");
      }
      return aiInstance;
    },
    // GetEmotion: (emotion: string) => (aiInstance) => {
    //   return aiInstance._emotions[emotion as keyof typeof aiInstance._emotions];
    // },
    AssertEmotion: (emotion: string, expected: number) => (aiInstance) => {
      const emotions = aiInstance.getEmotionalState();
      assert.approximately(
        emotions[emotion as keyof typeof emotions],
        expected,
        1,
        `Emotion ${emotion} should be approximately ${expected}`
      );
      return aiInstance;
    },

    AssertDrives: (assertion: (drives: string[]) => void) => (aiInstance) => {
      assertion(aiInstance.evaluateDrives());
      return aiInstance;
    },

    AssertSafetyPrioritized: () => (aiInstance) => {
      const drives = aiInstance.evaluateDrives();
      assert.include(drives, "safety");
      if (drives.includes("knowledge")) {
        assert.isAbove(
          drives.indexOf("safety"),
          drives.indexOf("knowledge"),
          "Safety should be prioritized"
        );
      }
      return aiInstance;
    },
    AssertFocusContent: (expectedContent: unknown) => (aiInstance) => {
      const focus = aiInstance.getCurrentFocus();
      assert.isNotNull(focus, "No current focus");
      assert.deepEqual(focus?.content, expectedContent);
      return aiInstance;
    },

    AssertFocusPriority: (min: number, max?: number) => (aiInstance) => {
      const focus = aiInstance.getCurrentFocus();
      assert.isNotNull(focus, "No current focus");
      if (max !== undefined) {
        assert.isAtLeast(focus!.priority, min);
        assert.isAtMost(focus!.priority, max);
      } else {
        assert.equal(focus!.priority, min);
      }
      return aiInstance;
    },

    AssertNoFocus: () => (aiInstance) => {
      assert.isNull(aiInstance.getCurrentFocus());
      return aiInstance;
    },

    AssertMessageInMemory: (expected: string | RegExp) => (aiInstance) => {
      const messages = aiInstance.recallFromWorkingMemory(0);
      if (typeof expected === "string") {
        assert.include(messages, expected);
      } else {
        assert.match(String(messages), expected);
      }
      return aiInstance;
    },

    AssertResponseTo:
      (message: string, expectedPattern: RegExp) => (aiInstance) => {
        const response = aiInstance.sendMessage(message);
        assert.match(response, expectedPattern);
        return aiInstance;
      },
    AddToMemory: (item: string) => (aiInstance: ai) => {
      aiInstance.addToWorkingMemory(item);
      return aiInstance;
    },
    AssertMemoryUsage: (expected: number) => (aiInstance: ai) => {
      const usage = aiInstance.workingMemoryUsage();
      assert.equal(usage, expected);
      return aiInstance;
    },
    ClearAllMemory: () => (aiInstance: ai) => {
      aiInstance.clearAllMemory();
      return aiInstance;
    },
    SendMessage:
      (message: string, callback?: (response: string) => void) =>
      (aiInstance: ai) => {
        const response = aiInstance.sendMessage(message);
        if (callback) callback(response);
        return aiInstance;
      },
    SetWorkingMemoryLimit: (limit: number) => (aiInstance) => {
      aiInstance.setWorkingMemoryLimit(limit);
      return aiInstance;
    },
    GetEmotion: (emotion: string) => (aiInstance: ai) => {
      const state = aiInstance.getEmotionalState();
      return state[emotion as keyof typeof state];
    },
  },

  checks: {
    Default: () => new ai(),
  },
};

import { ITestImplementation } from "testeranto/src/Types";

import { I } from "./emotion.test.interface";
import { M, O } from "./emotion.test";
import { EmotionSystem } from "../emotion";

export const EmotionImplementation: ITestImplementation<I, O, M> = {
  suites: {
    Default: "default",
  },

  givens: {
    Default: () => new EmotionSystem(),
    EmotionState: function (...Ig: any): ai {
      throw new Error("Function not implemented.");
    },
  },

  whens: {
    AppraiseEvent: (event) => (aiInstance) => {
      aiInstance.processInput(event);
      return aiInstance;
    },

    UpdateEmotions: () => (aiInstance) => {
      // @ts-ignore - accessing private method for testing
      aiInstance._emotionSystem.update();
      return aiInstance;
    },

    GetDominantEmotion: () => (aiInstance) => {
      return aiInstance.getDominantEmotion();
    },

    ProcessInput:
      (input: { content: string; metadata?: Record<string, unknown> }) =>
      (aiInstance) => {
        aiInstance.processInput(input.content, "external", input.metadata);
        return aiInstance.getCurrentFocus();
      },
  },
  thens: {
    AssertEmotionState:
      (expected) =>
        (actual) => {
        

        // const state = actual.getEmotionalState();
        // for (const [emotion, validator] of Object.entries(expected)) {
        //   if (!validator(state[emotion])) {
        //     throw new Error(
        //       `Emotion ${emotion} value ${state[emotion]} failed validation`
        //     );
        //   }
        // }
        // return true;
      },
  },
  checks: {},

  // checks: {
  //   Default: Check.Default(() => new ai()),
  // },
};


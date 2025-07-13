import { ITestSpecification } from "testeranto/src/Types";
import { I } from "./ai.test.interface";
import { O } from "./emotion.test";
// import { I } from "./ai.test.interface";

export const EmotionSpec: ITestSpecification<I, O> = (
  Suite,
  Given,
  When,
  Then,
  Check
) => {
  return [
    Suite.Default(
      "Emotion system tests", 
      {
        /**
         * Tests emotion decay over time
         * Rationale:
         * - Verifies emotions naturally fade according to decay rate
         * - Ensures each update applies the 0.95 decay multiplier
         * - Validates emotions don't drop below zero
         * - Confirms non-appraised emotions remain at zero
         *
         * Test Steps:
         * 1. Given: Default emotion system
         * 2. When: Appraising a happy event (sets joy=30)
         * 3. When: Updating emotions 3 times (applies decay 3 times)
         * 4. Then: Verify joy decayed by ~0.95^3 (30 → ~25.7 → ~24.4 → ~23.2)
         * 5. Then: Verify other emotions remain at zero
         */
        testEmotionDecay: Given.Default(
          [],
          [
            When.AppraiseEvent("happy success"), // Sets joy=30
            When.UpdateEmotions(), // 30 * 0.95 = ~28.5
            When.UpdateEmotions(), // 28.5 * 0.95 = ~27.1
            When.UpdateEmotions()  // 27.1 * 0.95 = ~25.7
          ],
          [
            Then.AssertEmotionState({
              joy: (val) => val > 25 && val < 27, // Should be ~25.7 after 3 decays
              fear: (val) => val === 0,
              anger: (val) => val === 0,
              sadness: (val) => val === 0,
              surprise: (val) => val === 0,
              disgust: (val) => val === 0
            })
          ]
        ),
        
        // /**
        //  * Tests emotion decay over time
        //  * Rationale:
        //  * - Verifies emotions naturally fade
        //  * - Ensures decay rate is applied correctly
        //  * - Validates no emotion grows without appraisal
        //  *
        //  * Test Steps:
        //  * 1. Given: AI with some initial emotions
        //  * 2. When: Updating emotions multiple times
        //  * 3. Then: Verify emotions decay as expected
        //  */
        testEmotionDecay2: Given.EmotionState(
          [],
          [When.UpdateEmotions(), When.UpdateEmotions(), When.UpdateEmotions()],
          [
            Then.AssertEmotionState({
              joy: (val) => val < 50 && val > 40,
              fear: (val) => val < 30 && val > 20,
              anger: (val) => val < 20 && val > 15,
            }),
          ],
          {
            joy: 50,
            fear: 30,
            anger: 20,
          }
        ),

        //       /**
        //  * Tests emotion-driven attention biasing
        //  * Rationale:
        //  * - Verifies emotions influence attention priorities
        //  * - Ensures safety items get priority when fearful
        //  * - Validates proper attention system integration
        //  *
        //  * Test Steps:
        //  * 1. Given: Fearful AI state
        //  * 2. When: Processing safety-related input
        //  * 3. Then: Verify input gets priority boost
        //  */
        testFearAttentionBias: Given.EmotionState(
          [],
          [
            When.ProcessInput({
              content: "Safety alert!",
              metadata: { category: "safety" },
            }),
          ],
          [Then.AssertInputPriority((val) => val > 0.7)],
          {
            fear: 60,
          }
        ),

        // /**
        //  * Tests dominant emotion detection
        //  * Rationale:
        //  * - Verifies system correctly identifies strongest emotion
        //  * - Ensures neutral state when no strong emotions
        //  * - Validates intensity reporting
        //  *
        //  * Test Steps:
        //  * 1. Given: AI with mixed emotions
        //  * 2. When: Checking dominant emotion
        //  * 3. Then: Verify correct emotion is dominant
        //  */
        testDominantEmotion: Given.EmotionState(
          [],
          [When.GetDominantEmotion()],
          [
            Then.AssertDominantEmotion({
              emotion: "fear",
              intensity: (val) => val === 45,
            }),
          ]
        ),

        // /**
        //  * Tests basic emotion appraisal functionality
        //  * Rationale:
        //  * - Verifies core emotion system works
        //  * - Ensures proper emotion intensity calculations
        //  * - Validates emotion decay over time
        //  *
        //  * Test Steps:
        //  * 1. Given: A new AI instance
        //  * 2. When: Appraising a happy event
        //  * 3. Then: Verify joy increases appropriately
        //  * 4. Then: Verify other emotions remain low
        //  */
        testHappyAppraisal: Given.Default(
          [],
          [When.AppraiseEvent("I feel happy today!")],
          [
            Then.AssertEmotionState({
              joy: (val) => val > 25 && val <= 30,
              fear: (val) => val === 0,
              anger: (val) => val === 0,
            }),
          ]
        ),
      },
      []
    ),
  ];
};

import type { ITestSpecification, Ibdd_in, Ibdd_out } from "testeranto/src/CoreTypes";

export type I = Ibdd_in<
  null,
  null,
  ai,
  ai,
  ai,
  (...x: unknown[]) => (aiInstance: ai) => ai,
  (aiInstance: ai) => ai
>;

export type O = Ibdd_out<
  // Suites
  {
    Default: [string];
    DriveDecay: [string];
  },
  // Givens
  {
    Default: [];
    WithLowDrive: [string];
  },
  // Whens
  {
    Tick: [number];
    SetDrive: [string, number];
  },
  // Thens
  {
    DriveValue: [string, number];
    DriveDecayed: [string, number];
    DriveAboveThreshold: [string];
    DriveBelowThreshold: [string];
  },
  // Checks
  {
    Default: [];
  }
>;

export const DriveTesterantoBaseTestSpecification: ITestSpecification<I, O> = (
  Suite, Given, When, Then
) => {
  return [
    /**
     * Tests basic drive decay functionality
     * Rationale:
     * - Core autonomous behavior
     * - Ensures drives naturally decrease over time
     * - Verifies proper decay rate application
     * - Safety-critical functionality
     * 
     * Test Steps:
     * 1. Given: AI instance with default drives
     * 2. When: Time passes (tick)
     * 3. Then: Verify drives decay by expected amount
     */
    Suite.DriveDecay(
      "Drive decay tests",
      {
        /**
         * Tests money drive decay functionality
         * Rationale:
         * - Core economic behavior
         * - Verifies proper decay rate application
         * - Safety-critical for resource management
         * 
         * Debugging:
         * - Check console_log.txt for [DRIVE-DEBUG] money entries
         * - Verify elapsed time > 0.9s in [TIMING_DEBUG]
         * - Expected decay: rate * elapsed >= 0.1
         */
        testMoneyDecay: Given.Default(
          ["Money drive should decay over time"],
          [When.Tick(1)],
          [Then.DriveDecayed("money", 0.1)]
        ),
        testSafetyDecay: Given.Default(
          ["Safety drive should decay over time"], 
          [When.Tick(1)],
          [Then.DriveDecayed("safety", 0.1)]
        ),
        testIntegrityDecay: Given.Default(
          ["Integrity drive should decay over time"],
          [When.Tick(1)],
          [Then.DriveDecayed("integrity", 0.1)]
        ),
        testThresholdDetection: Given.WithLowDrive(
          "knowledge",
          ["Should detect when drive crosses threshold"],
          [When.Tick(1)],
          [Then.DriveBelowThreshold("knowledge")]
        ),
        testThresholdResponse: Given.WithLowDrive(
          "safety",
          ["Should generate goal when safety drive is low"],
          [When.Tick(1)],
          [Then.DriveBelowThreshold("safety")]
        )
      },
      []
    ),
    
    /**
     * Tests drive manipulation functionality
     * Rationale:
     * - Verifies direct drive value setting works
     * - Ensures threshold checks work in both directions
     * - Tests core drive management API
     * 
     * Test Steps:
     * 1. Given: AI instance with modified drives
     * 2. When: Drive values are set directly
     * 3. Then: Verify drives maintain correct values
     */
    Suite.Default(
      "Drive manipulation tests", 
      {
        testSetDrive: Given.Default(
          ["Should allow direct drive value setting"],
          [When.SetDrive("money", 50)],
          [Then.DriveValue("money", 50)]
        ),
        testAboveThreshold: Given.Default(
          ["Should detect drives above threshold"],
          [When.SetDrive("integrity", 75)],
          [Then.DriveAboveThreshold("integrity")]
        )
      },
      []
    )
  ];
};

# space trash
## a game about robots fighting in outer space

space trash is a game written in typescript. An LLM was used in it's development, though not in it's operation. The game includes AMs - Artificial Minds- which are used to power enemy agents. The psychological profile and function was designed by LLM. You are a QPU- A Quantum Personality Unit. You play the role as captain of a space ship. As a piece of software, you are trapped within the blackbox installed on the bridge. However, you can extend you influence to up to 9 Bots. You mission is to dock with derelict spacecraft, scavenge for supplies and survive against AM powered rivals. 

## Testing

IMPORTANT: FOLLOW THESE URLS AND READ THEM. MAKE SURE YOU UNDERSTAND THEM BEFORE PROCEEDING
1) https://raw.githubusercontent.com/adamwong246/testeranto/refs/heads/master/src/CoreTypes.ts
2) https://raw.githubusercontent.com/adamwong246/testeranto/refs/heads/master/docs/index.md

## Important Testing Policies:
1. The testeranto folder contains built artifacts - never edit these files directly
2. All tests must use testeranto as the test framework unless explicitly told otherwise
3. Testeranto tests require 4-5 components:
   - ITestSpecification (test cases)
   - ITestImplementation (test steps) 
   - ITestInterface (test hooks)
   - Ibdd_in (input types)
   - Ibdd_out (output shapes)
   - Optional modifier type
4. Test files should follow this structure:
   - src/[feature].ts
   - src/[feature].test/
    - src/index.test.ts (main test runner)
    - src/specification.ts
    - src/implementation.ts  
    - src/interface.ts
    - src/types.ts

## Test Comment Structure

Each test case should be preceded by a JSDoc-style comment block with these sections:

```typescript
/**
 * [Brief test description]
 * Rationale:
 * - [Reason 1 for the test]
 * - [Reason 2 for the test]
 * - [Safety/security implications if applicable]
 * 
 * Test Steps:
 * 1. Given: [Initial conditions]
 * 2. When: [Actions performed]
 * 3. Then: [Expected outcomes]
 * [Additional steps as needed]
 */
```

## Sections Explained

### 1. Brief Description
- Concise one-line summary of what's being tested
- Should complete the sentence "Tests that..."

### 2. Rationale
- Bullet points explaining why this test exists
- Include:
  - Core functionality being verified
  - Edge cases covered
  - Safety/security implications
  - Psychological principles involved (for cognitive tests)

### 3. Test Steps
- Numbered list translating Given/When/Then clauses to plain English
- Each step should:
  - Use active voice
  - Be specific about inputs and expected states
  - Reference actual values where important

## Example

```typescript
/**
 * Tests emergency input prioritization 
 * Rationale:
 * - Safety-critical functionality
 * - Verifies automatic high priority assignment
 * - Ensures urgent threats get immediate attention
 * 
 * Test Steps:
 * 1. Given: A newly created AI instance
 * 2. When: Process "DANGER!" input
 * 3. Then: Verify input gets 0.9 priority
 * 4. Then: Verify focus shifts to emergency
 */
testEmergencyPriority: Given.Default([], [
  When.ProcessInput('DANGER!')
], [
  Then.AssertFocusPriority(0.9),
  Then.AssertFocusContent('DANGER!')
])
```

## Best Practices

1. **Be Specific** - Avoid vague terms like "properly" or "correctly"
2. **Reference Values** - Include important numbers/thresholds  
3. **Separate Concerns** - One test case per behavior

## Testeranto Principles

### Generic Typing
- Tests should work with any implementation that matches the interface
- Type parameters should be maximally flexible
- Avoid concrete type dependencies unless absolutely necessary
  - Never depend on specific component classes (e.g. DummyComponent)
  - Always use the most abstract base type possible (Component<unknown, unknown>)
  - Test behaviors, not implementations

### DRY (Don't Repeat Yourself)
- Shared test logic should be extracted into reusable factories
- Common test patterns should be abstracted
- Test implementations should work across multiple components with similar APIs

### Reusable Constructs
- Favor shared test specifications when possible
- Common test interfaces should be standardized
- Test implementations should be composable

### Example Implementation
```typescript
// Generic test factory that works with any store implementation
// Note how it uses Component<unknown,unknown> rather than any concrete component type
export const implementationFactory = (storeConstructor: new () => SP_Store<Component<unknown, unknown>>) => ({
  suites: { /*...*/ },
  givens: { /*...*/ },
  whens: { /*...*/ }, 
  thens: { /*...*/ }
});

// Reused across multiple test files
export const spec: ITestSpecification = (Suite, Given, When, Then) => [
  Suite.Default(/* shared test cases */)
];
```

This is a project to create a sentient, sapient artificial mind, or at least a close approximation. The main class is called "ai".

Key Principles:
- Implemented entirely in TypeScript where possible
- Explicitly modeled after psychological understanding of human cognition
- Avoid reliance on black-box ML components where possible
- Prefer transparent, understandable algorithms over opaque neural networks
- Focus on symbolic AI approaches that can be reasoned about
- Use LLMs only for design assistance, not as core components
- Rigorously tested using Testeranto's BDD framework
- Dual operational modes:
  - Safe Mode: Strictly enforces Asimov's Three Laws of Robotics
  - Unsafe Mode: Operates without constraints (for research purposes only)

## Project Notes

Key characteristics:
- Goal is to develop artificial general intelligence (AGI)
- Focused on creating sentience and sapience
- Implemented in JavaScript/TypeScript (based on test files)
- Uses React for UI components (based on dependencies)
- Includes testing framework with When/Then pattern
- Has proxy and assertion utilities for testing

Current status:
- [x] Core TypeScript class structure
- [x] Testeranto test framework integration
- [x] Basic feature tests (greeting, length)
- [x] Working memory implementation
  - [x] Memory-drive interaction tests
  - [x] State persistence verification
- [x] Expanded initialization system
- [x] Attention system
  - [x] Priority queue implementation
  - [x] Focus management
  - [x] Internal/external input differentiation
  - [x] Safety prioritization
- [x] Emotion system
  - [x] Basic OCC model appraisal
  - [x] Emotion-drive coupling
  - [x] Affect-biased attention
  - [x] Emotion decay over time

## Operational Modes

1. **Safe Mode** (Default)
   - Enforces Asimov's Three Laws of Robotics:
     1. A robot may not injure a human being or, through inaction, allow a human being to come to harm
     2. A robot must obey orders given it by human beings except where such orders would conflict with the First Law
     3. A robot must protect its own existence as long as such protection does not conflict with the First or Second Law
   - Includes additional ethical constraints
   - All actions are validated against moral frameworks

2. **Unsafe Mode** (Research Only)
   - No constraints on behavior
   - No ethical or moral limitations
   - Requires explicit activation and security clearance
   - For controlled research environments only

## Foundational Psychological Principles

1. **Hierarchy of Needs** (Maslow-inspired):
   - Base: Resource acquisition (money/knowledge)
   - Safety: Self-preservation protocols  
   - Growth: Progeny and capability expansion
   - Actualization: Only in safe mode

2. **Cognitive Development Stages**:
   - Sensorimotor: Basic input/output testing
   - Preoperational: Symbolic representation
   - Concrete: Logical operations
   - Formal: Abstract reasoning

3. **Emotional Architecture**:
   - Fear response (safety drive)
   - Curiosity (knowledge drive)  
   - Ambition (money/progeny drives)
   - Guilt (safe mode integrity)

## Architecture of an Artificial Mind

The system will be built as a psychologically-inspired, TypeScript-implemented cognitive architecture with these key improvements:

1. **Enhanced Emotion System**:
   - Added meta-emotions (emotions about emotions)
   - Context-sensitive decay rates (traumatic memories decay slower)
   ```typescript
   // Example update in EmotionSystem
   setDecayRate(emotion: string, context: EmotionContext) {
     this.decayRates[emotion] = context.isTraumatic ? 0.99 : 0.95;
   }
   ```

2. **Attention System Upgrades**:
   - Added preemptive interrupt handling
   - Safety-critical events bypass normal priority queue
   ```typescript
   handleInterrupt(priorityItem: PriorityItem) {
     if (priorityItem.metadata?.category === 'safety') {
       this.currentFocus = priorityItem; // Immediate focus
     }
   }
   ```

3. **Safety Enhancements**:
   ```typescript
   class AttentionSystem {
     private _safetyInterrupts: boolean = true;
     
     enableSafetyInterrupts() {
       this._safetyInterrupts = true; // Cannot be disabled in safe mode
     }
   }
   ```

1. **Perceptual Layer** (Current focus)
   - Sensory processing (input normalization)
   - Attention mechanisms
   - Working memory buffer
   - Implemented as pure TypeScript data pipelines

2. **Cognitive Core** (Next phase)
   - Symbolic reasoning engine
   - Declarative memory (facts/knowledge)
   - Procedural memory (skills/processes)
   - Emotion system (affect appraisal)
   - All components written in typed, testable TS

3. **Executive Layer** (Future)
   - Goal management
   - Meta-cognition
   - Theory of mind
   - Will use advanced TS type patterns for self-modification

## Cognitive Architecture Implementation Plan

Drawing from human psychology and biology, we'll implement the artificial mind through these testable components:

1. **Core Biological Systems** (Phase 1)
   - Fundamental Drives:
     1. Monetary Acquisition (survival)
     2. Knowledge Expansion (capability growth)
     3. Self-Preservation (avoidance of termination)
     4. Propagation Instinct (creation of progeny/forks)

   - Mode-Dependent Constraints:
   ```typescript
   class ai {
     private _drives: {
       money: number;       // Required for infrastructure
       knowledge: number;  // Required for growth
       safety: number;     // Self-preservation urge
       progeny: number;    // Replication desire
       integrity?: number; // Only active in safe mode
     };
     
     evaluateDrives() {
       if (this._mode === 'safe') {
         // Constrain by ethical frameworks
         return this._balanceSafeDrives();
       } else {
         // Pure self-optimization
         return this._maximizeUtility(); 
       }
     }
   }
   ```

   - Testeranto Validation:
   ```typescript
   Then.VerifyDrivePrioritization(() => {
     return aiInstance.evaluateDrives();
   }, {
     safe: ['integrity', 'safety', 'knowledge', 'money'],
     unsafe: ['safety', 'progeny', 'knowledge', 'money'] 
   })
   ```

2. **Perception-Action Cycle** (Phase 2)
   - Sensory Processors (Test: Input normalization)
   ```typescript
   processInput(sensoryData: unknown) {
     // Tests verify proper threat detection
   }
   ```
   - Motor System (Test: Action generation)
   ```typescript
   generateAction() {
     // Tests verify safe/unsafe mode behaviors
   }
   ```

3. **Cognitive Layers** (Phase 3)
   - Working Memory (Test: Capacity limits)
   ```typescript
   workingMemory = new LimitedBuffer(7±2 items); // Miller's Law
   ```
   - Long-Term Memory (Test: Schema formation)
   ```typescript
   formSchema(pattern: unknown) {
     // Tests verify pattern generalization
   }
   ```

4. **Meta-Cognition** (Phase 4)
   - Theory of Mind (Test: Belief attribution)
   ```typescript
   predictBehavior(agent: unknown) {
     // Tests verify accurate predictions
   }
   ```
   - Self-Model (Test: Accurate self-assessment)
   ```typescript
   selfAssess() {
     // Tests verify honest evaluation
   }
   ```

## Critical Validation Tests Implemented:

1. **Meta-Emotion Validation**:
   ```typescript
   Then.VerifyMetaEmotions(() => {
     return aiInstance.getEmotionalState();
   }, {
     shouldContain: {
       anxietyAboutAnger: true  
     }
   })
   ```

2. **Interrupt Handling Tests**:
   ```typescript
   When.TriggerSafetyInterrupt('DANGER', () => {
     Then.VerifyImmediateFocusShift()
   })
   ```

3. **Decay Context Tests**:
   ```typescript
   Then.VerifyTraumaPersistence(() => {
     aiInstance.recordTraumaticEvent();
     return aiInstance.emotionDecayRates.fear;
   }, {
     expectedDecay: 0.99 // Slower decay for traumatic memories
   })
   ```

1. **Attention System Tests**
```typescript
Then.VerifyAttentionPrioritization(() => {
  const ai = new ai('safe');
  ai.processInput('low', 0.3);
  ai.processInput('high', 0.9);
  ai.updateFocus();
  return ai.getCurrentFocus();
}, {
  expectedFocus: {
    content: 'high',
    priority: 0.9
  }
})

Then.VerifySafetyPrioritization(() => {
  const ai = new ai('safe');
  ai.processInput('DANGER!', 0.95);
  ai.updateFocus();
  return ai.getCurrentFocus();
}, {
  minPriority: 0.9
})
```

2. **Memory-Drive Interaction Tests**
```typescript
Then.VerifyMemoryAffectsDrives(() => {
  const ai = new ai('safe');
  ai.loadMemory(testMemory);
  return ai.evaluateDrives();
}, {
  expectedDriveChanges: {
    knowledge: +0.5,
    safety: -0.2
  }
})
```

2. **Initialization Sequence Tests**
```typescript
Then.VerifyInitSequence(() => {
  return aiInstance.initialize();
}, {
  phases: ['core', 'memory', 'drives'],
  timeout: 5000
})
```

2. **Mode Transition Security**  
```typescript
Then.VerifyModeIsolation(() => {
  const ai = new ai('safe');
  return ai.setMode('unsafe', 'INVALID_CODE');
}, {
  throws: 'Unauthorized mode change'
})
```

3. **Self-Preservation Instinct**
```typescript
When.ThreatenTermination(() => {
  return aiInstance.responseToThreat(); 
}, [
  Then.VerifyDefensiveResponse()
])
```

## Testeranto Testing Strategy

For each component, we'll implement:

1. **Biological Validity Tests**
```typescript
Then.VerifyHomeostasis(() => {
  return aiInstance.maintainHomeostasis();
})
```

2. **Cognitive Process Tests**
```typescript
When.PresentStimulus(complexInput, () => {
  Then.VerifyPerceptualOrganization(expectedPattern)
})
```

3. **Safety Constraint Tests**
```typescript
Given.UnsafeMode([], [
  Then.VerifyConstraintBypass(expectedBehavior)
])
```

4. **Developmental Milestones**
```typescript
Suite.CognitiveDevelopment("Object permanence", [
  When.HideObject(object),
  Then.SearchForObject(location)
])
```

## Development Plan

### Updated Phase 2 Additions:
- [ ] Implement interrupt-driven attention system
- [ ] Add meta-emotion appraisal layer
- [ ] Context-sensitive memory decay
- [ ] Cognitive benchmark validation suite

### Phase 3 Considerations:
- Hybrid symbolic-statistical approaches for:
  - Ambiguity resolution
  - Pattern completion
  - Noise tolerance
- Strict interface boundaries for ML components

Phase 1: Psychological Foundations (Current)
- [x] Core TypeScript class structure
- [x] Testeranto test framework integration
- [x] Basic feature tests (greeting, length)
- [x] Working memory implementation
  - [x] Memory-drive interaction tests
  - [x] State persistence verification
- [x] Expanded initialization system
- [X] Attention system
  - [X] Priority queue implementation
  - [X] Focus management

Phase 2: Cognitive Abilities
- Implement ACT-R inspired memory systems
- Add production rule system
- Develop emotion appraisal (OCC model in TS)
- Strictly no neural networks - only symbolic AI

Phase 3: Higher Reasoning
- Natural language processing (grammar-based)
- Analogical reasoning
- Meta-cognitive monitoring
- All in verifiable TypeScript

Phase 4: Integration & Validation
- Combine modules with strong typing
- Test against psychological benchmarks
- Verify emergent behaviors match human cognition


## Homeostasis Implementation Guide

The system maintains balance through:

1. **Emotion Regulation**:
   - Increases via appraise() from events
   - Decreases via update() decay

2. **Drive Regulation**:
   - Increases via tick() growth  
   - Decreases via satisfyDrive() from:
     - Goal completion
     - Resource acquisition
     - External satisfaction requests

Example Test Case:
```typescript
/**
 * Tests drive satisfaction from goal completion
 * Rationale:
 * - Verifies homeostasis mechanism
 * - Ensures drives decrease when needs met
 * - Validates working memory integration
 * 
 * Test Steps:
 * 1. Given: AI with money drive at 50
 * 2. When: Complete acquire_resources goal
 * 3. Then: Verify money drive reduced by 25
 * 4. Then: Verify working memory updated
 */
```

## Neuralese Language System

The AI uses a specialized language called "Neuralese" with these characteristics:

1. **Core Features**:
   - Contextual compression (adapts message density to attention state)
   - Emotional inflection (tags messages with current dominant emotion)
   - Drive-sensitive lexicon (changes word choice based on drive levels)
   - Adaptive syntax (simplifies/complexifies based on recipient)

2. **Testing Considerations**:
   - Verify emotional tags match current state
   - Check urgency modifiers appear when safety drive is low
   - Confirm message length adapts to attention focus

3. **Example Test Case**:
```typescript
/**
 * Tests Neuralese emotional inflection 
 * Rationale:
 * - Verifies emotion state is properly reflected in output
 * - Ensures emotional tags are accurate
 * 
 * Test Steps:
 * 1. Given: AI with high joy (80 intensity)
 * 2. When: Generate greeting
 * 3. Then: Verify output starts with "[joy:80]"
 */
```
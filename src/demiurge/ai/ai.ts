import { AttentionSystem } from "./attention";
import { EmotionSystem } from "./emotion";
import type { PriorityItem } from "./attention";
import { FloatMovingComponent } from "../game/physical";
import { ECSWithSystem } from "../abstractClasses/0-WithSystem";
import { SpaceTrash } from "../../spacetrash/Game/9-WithTiled";

// AM: Allied MasterComputer
// I mean Artificial Mind lol

export class AM {
  
  eid: number;

  constructor(mode: "safe" | "unsafe" = "safe", eid: number) {
    console.log("[AI] Initializing new AI instance");

    this.eid = eid;

    this._store = {};
    this._mode = mode;
    this._attention = new AttentionSystem();
    this._emotionSystem = new EmotionSystem({
      joy: Math.random() * 100,
      fear: Math.random() * 100,
      anger: Math.random() * 100,
      sadness: Math.random() * 100,
      surprise: Math.random() * 100,
      disgust: Math.random() * 100,
    });

    console.log("[AI] Emotion system initialized:", this._emotionSystem);
    console.log("[AI] Initial emotions:", this._emotions);
    this._name = this._generateName();
    // Randomize initial drives (50-100 for safety/integrity, 0-100 for others)
    this._drives = {
      money: Math.floor(Math.random() * 100),
      knowledge: Math.floor(Math.random() * 100),
      safety: 50 + Math.floor(Math.random() * 50), // 50-100
      progeny: Math.floor(Math.random() * 100),
      integrity:
        mode === "safe"
          ? 80 + Math.floor(Math.random() * 20)
          : Math.floor(Math.random() * 50),
    };

    // More reasonable decay rates (0.1-0.5 per second)
    this._driveDecayRates = {
      money: 0.1 + Math.random() * 0.4,
      knowledge: 0.1 + Math.random() * 0.4,
      safety: 0.1 + Math.random() * 0.4,
      progeny: 0.1 + Math.random() * 0.4,
      integrity: 0.1 + Math.random() * 0.4,
    };

    // Set fixed thresholds (not proportional to initial values)
    this._driveThresholds = {
      money: 30,
      knowledge: 30,
      safety: 40,
      progeny: 20,
      integrity: 50,
    };

    this._lastTickTime = Date.now();

    // Log initial drive states and decay rates
    console.log(
      `[INIT] ${this._name} drive decay rates:`,
      this._driveDecayRates
    );
    console.log(`[INIT] ${this._name} initial drives:`, this._drives);
  }

  private _currentPath: string[] = [];
  private _currentTargetIndex = 0;
  _avoidanceState: {
    phase: 'backingUp' | 'turning' | 'movingForward';
    stepsRemaining: number;
    originalDirection: { dx: number; dy: number };
    randomTurnAngle: number;
  } | null = null;

  act(game: SpaceTrash, delta: number) {
    if (!game.components.SP_PhysicalComponent.has(this.eid)) {
      console.warn(`AI ${this.eid} missing physical component`);
      return;
    }

    const physical = game.components.SP_PhysicalComponent.take(this.eid);
    if (!physical?.body?.pos) {
      console.warn(`AI ${this.eid} has invalid physical component`);
      return;
    }

    const currentPos = physical.body.pos;
    const hasNavSense = game.components.NavSenseComponent?.has(this.eid);

    // Navigation with NavSense
    if (hasNavSense && game.components.NavSenseComponent) {
      const navSense = game.components.NavSenseComponent.take(this.eid);
      if (!navSense) {
        console.warn(`AI ${this.eid} failed to get NavSense component`);
        return;
      }
      
      // Find new path if needed
      if (navSense.currentPath.length === 0) {
        this._findNewPath(game, currentPos);
        if (navSense.currentPath.length === 0) return; // No path found
      }

      // Get current target node
      const currentNode = navSense.currentPath[this._currentTargetIndex];
      const nodeAttr = game.navmesh.graphOfCentroid.getNodeAttributes(currentNode);
      
      // Calculate movement vector
      const dx = nodeAttr.x - currentPos.x;
      const dy = nodeAttr.y - currentPos.y;
      const distance = Math.sqrt(dx*dx + dy*dy);

      // Only proceed if we're not already at the node
      if (distance > 5) {
        const directionX = dx/distance;
        const directionY = dy/distance;
        const speed = 0.5;

        // Apply movement
        game.components.FloatMovingComponent.take(this.eid)
          .setMotion(directionX * speed, directionY * speed);
      } else {
        // Advance to next node in path
        this._currentTargetIndex++;
        
        // If path complete, clear it
        if (this._currentTargetIndex >= navSense.currentPath.length) {
          navSense.clearCurrentPath();
          game.components.FloatMovingComponent.take(this.eid).setMotion(0, 0);
        }
      }
    } 
    // Fallback behavior if no NavSense
    else {
      const speed = 0.3;
      // Simple random wander
      const directionX = Math.random() * 2 - 1;
      const directionY = Math.random() * 2 - 1;

      game.components.FloatMovingComponent.take(this.eid)
        .setMotion(directionX * speed, directionY * speed);
    }
  }

  private _findNewPath(game: SpaceTrash, currentPos: {x: number, y: number}) {
    // Find nearest node with detailed logging
    let nearestNode = '';
    let minDistance = Infinity;
    let nearestX = 0;
    let nearestY = 0;
    
    console.log('Current position:', currentPos.x, currentPos.y);
    
    game.navmesh.graphOfCentroid.forEachNode((node, attr) => {
      const dx = attr.x - currentPos.x;
      const dy = attr.y - currentPos.y;
      const distance = Math.sqrt(dx*dx + dy*dy);
      
      console.log(`Checking node ${node} at (${attr.x},${attr.y}) - distance: ${distance}`);
      
      if (distance < minDistance) {
        minDistance = distance;
        nearestNode = node;
        nearestX = attr.x;
        nearestY = attr.y;
      }
    });
    
    console.log('Selected nearest node:', nearestNode, 'at (', nearestX, nearestY, ') distance:', minDistance);

    // Find a random target node (excluding current nearest)
    let targetNode = '';
    const nodes: string[] = [];
    game.navmesh.graphOfCentroid.forEachNode(node => {
      if (node !== nearestNode) nodes.push(node);
    });
    
    if (nodes.length > 0) {
      targetNode = nodes[Math.floor(Math.random() * nodes.length)];
    }

    // Find path between nodes using BFS
    if (nearestNode && targetNode) {
      try {
        const path = this._findPathBFS(game.navmesh.graphOfCentroid, nearestNode, targetNode);
        if (path && path.length > 0) {
          this._currentPath = path;
          this._currentTargetIndex = 0;
          console.log('New path:', this._currentPath);
        }
      } catch (e) {
        console.warn('Pathfinding error:', e);
      }
    }
  }

  private _findPathBFS(graph: any, startNode: string, endNode: string): string[] {
    const visited = new Set<string>();
    const queue: {node: string, path: string[]}[] = [{node: startNode, path: [startNode]}];
    
    while (queue.length > 0) {
      const current = queue.shift()!;
      
      if (current.node === endNode) {
        return current.path;
      }

      if (!visited.has(current.node)) {
        visited.add(current.node);
        
        graph.forEachOutboundEdge(current.node, (edge: any, attributes: any, source: string, target: string) => {
          if (!visited.has(target)) {
            queue.push({
              node: target,
              path: [...current.path, target]
            });
          }
        });
      }
    }

    console.warn('No path found from', startNode, 'to', endNode);
    return [];
  }

  // updateVisualization?: () => void;
  private _store: Record<string, unknown>;
  private _mode: "safe" | "unsafe";
  private _attention: AttentionSystem;

  // ACL Constants
  private readonly ACL_VERBS = {
    QUERY: "query",
    INFORM: "inform",
    REQUEST: "request",
    ACK: "ack",
    NACK: "nack",
  };

  private readonly ACL_SUBJECTS = {
    STATUS: "status",
    PLAN: "plan",
    MEMORY: "memory",
    DRIVES: "drives",
    MODE: "mode",
    EMERGENCY: "emergency",
    ATTENTION: "attention",
  };

  private _drives: Record<string, number> = {};
  private _driveDecayRates: Record<string, number> = {};
  private _driveThresholds: Record<string, number> = {};

  // Public drive accessors for testing
  public getDriveValue(drive: string): number {
    if (!Object.prototype.hasOwnProperty.call(this._drives, drive)) {
      console.warn(`Accessing uninitialized drive: ${drive}`);
      return 0;
    }
    return this._drives[drive];
  }

  public setDrive(drive: string, value: number): void {
    this._drives[drive] = value;
  }

  public getDriveDecayRate(drive: string): number {
    return this._driveDecayRates[drive] || 0;
  }

  public setDriveDecayRate(drive: string, rate: number): void {
    this._driveDecayRates[drive] = rate;
  }

  public getDriveThreshold(drive: string): number {
    return this._driveThresholds[drive] || 0;
  }
  private _emotionSystem: EmotionSystem;
  private _lastTickTime = Date.now();

  private readonly LANGUAGE = {
    NAME: "Neuralese",
    VERSION: "1.0",
    FEATURES: [
      "contextual_compression",
      "emotional_inflection",
      "drive_sensitive_lexicon",
      "adaptive_syntax",
    ],
  };

  private _name: string;
  private _needsVisualUpdate = false;

  // Autonomous behavior methods
  tick(): void {
    console.log("[AI] TICK START ===================================");
    const now = Date.now();
    console.log("[AI] Current time:", now);
    console.log("[AI] Last tick time:", this._lastTickTime);

    const rawElapsed = (now - this._lastTickTime) / 1000;
    console.log(
      `[AI] Raw elapsed time since last tick: ${rawElapsed.toFixed(6)}s`
    );
    // Ensure minimum elapsed time but preserve actual elapsed for accurate simulation
    const elapsed = rawElapsed > 0 ? Math.max(0.001, rawElapsed) : 0.001;
    this._lastTickTime = now;

    // Update emotions
    console.log("[AI] Updating emotion system");
    const emotionChanges = this._emotionSystem.update();
    console.log("[AI] Emotion changes:", emotionChanges);
    this._needsVisualUpdate = true;

    console.log(`[TIMING_DEBUG] Raw elapsed: ${rawElapsed.toFixed(6)}s`);
    console.log(`[TIMING_DEBUG] Effective elapsed: ${elapsed.toFixed(6)}s`);
    console.log(`[TIMING_DEBUG] Current time: ${now}`);
    console.log(`[TIMING_DEBUG] Last tick time: ${this._lastTickTime}`);
    console.log(
      `[TIMING_DEBUG] Time difference: ${now - this._lastTickTime}ms`
    );

    // Decay drives with comprehensive logging
    for (const drive in this._drives) {
      const initialValue = this._drives[drive];
      const decayRate = this._driveDecayRates[drive];
      // Ensure minimum decay of at least 10% of decay rate per tick
      const baseGrowth = decayRate * elapsed;
      const minGrowth = decayRate * 0.1;
      const growthAmount =
        elapsed >= 1 ? baseGrowth : Math.max(baseGrowth, minGrowth);
      const newValue = Math.min(100, initialValue + growthAmount);

      if (growthAmount < minGrowth && rawElapsed > 0) {
        console.warn(`[DRIVE-WARN] Sub-minimum growth for ${drive}:`, {
          initialValue,
          decayRate,
          elapsed,
          growthAmount,
          minGrowth,
        });
      }

      // Debug logging
      console.log(`[DRIVE-DEBUG] ${this._name} ${drive}:`);
      console.log(`  Initial value: ${initialValue.toFixed(2)}`);
      console.log(`  Growth rate: ${decayRate.toFixed(4)}/s`);
      console.log(`  Elapsed time: ${elapsed.toFixed(4)}s`);
      console.log(`  Growth amount: ${growthAmount.toFixed(4)}`);
      console.log(`  New value: ${newValue.toFixed(2)}`);

      this._drives[drive] = newValue;

      // Log to console and UI
      const timestamp = new Date().toISOString().slice(11, 19);
      const logMsg = `[${timestamp}] ${
        this._name
      } ${drive} ${initialValue.toFixed(2)}→${newValue.toFixed(
        2
      )} (+${growthAmount.toFixed(4)}/s)`;
      console.log(logMsg);
      if (typeof window !== "undefined") {
        const loggingWindow = window as Window & {
          logEvent?: (msg: string) => void;
        };
        if (typeof loggingWindow.logEvent === "function") {
          try {
            let msg: string;
            if (typeof logMsg === "string") {
              msg = logMsg;
            } else if (typeof logMsg === "object" && logMsg !== null) {
              msg = JSON.stringify(logMsg);
            } else {
              msg = String(logMsg);
            }
            loggingWindow.logEvent(msg);
          } catch (e) {
            console.error("Failed to log event:", e);
          }
        }

        // Verify decay was applied
        if (Math.abs(this._drives[drive] - newValue) > 0.001) {
          console.error(
            `[DRIVE-ERROR] Decay not applied correctly for ${drive}!`
          );
          console.error(
            `  Expected: ${newValue}, Actual: ${this._drives[drive]}`
          );
        }

        // Always update visualization when drives change
        if (initialValue !== newValue) {
          this._needsVisualUpdate = true;
        }
      }

      if (this._needsVisualUpdate && typeof window !== "undefined") {
        const win = window as Window & { updateVisualization?: () => void };
        if (typeof win.updateVisualization === "function") {
          win.updateVisualization();
          this._needsVisualUpdate = false;
        }
      }

      // Check drive thresholds and generate goals
      this._checkDriveNeeds();

      // Emotion updates are now handled in tick() at consistent intervals

      // Process current plan if exists
      if (this._currentPlan) {
        this.executeNextStep();
      } else {
        this.evaluateGoals();
      }
    }
  }

  private _checkDriveNeeds(): void {
    for (const [drive, value] of Object.entries(this._drives)) {
      if (value < this._driveThresholds[drive]) {
        this._generateAutonomousGoal(drive);
      }
    }
  }

  private readonly DRIVE_GOAL_MAP = {
    knowledge: "acquire_knowledge",
    safety: "ensure_safety",
    money: "acquire_resources",
    integrity: "verify_system_integrity",
    progeny: "create_backup",
  };

  private readonly GOAL_SATISFACTION_MAP = {
    acquire_knowledge: {
      drive: "knowledge",
      amount: 30,
      triggers: ["learn", "study", "research"],
    },
    ensure_safety: {
      drive: "safety",
      amount: 40,
      triggers: ["secure", "protect", "shield"],
    },
    acquire_resources: {
      drive: "money",
      amount: 25,
      triggers: ["earn", "obtain", "acquire"],
    },
    verify_system_integrity: {
      drive: "integrity",
      amount: 35,
      triggers: ["validate", "check", "verify"],
    },
    create_backup: {
      drive: "progeny",
      amount: 20,
      triggers: ["copy", "replicate", "backup"],
    },
  };

  /**
   * Checks if message indicates drive satisfaction
   */
  private checkForSatisfactionTriggers(message: string): void {
    const lowerMsg = message.toLowerCase();
    for (const [goal, { drive, amount, triggers }] of Object.entries(
      this.GOAL_SATISFACTION_MAP
    )) {
      if (triggers.some((trigger) => lowerMsg.includes(trigger))) {
        this.satisfyDrive(drive, amount);
        this.addToWorkingMemory(`satisfied_${drive}_via_${goal}`);
      }
    }
  }

  private _generateAutonomousGoal(drive: string): void {
    const goal = this.DRIVE_GOAL_MAP[drive];

    if (this.DRIVE_GOAL_MAP[drive]) {
      const priority = 1 - this._drives[drive] / 100; // Higher priority for lower drive
      this.addGoal(this.DRIVE_GOAL_MAP[drive], priority);
    }
  }

  get mode(): "safe" | "unsafe" {
    return this._mode;
  }

  setMode(mode: "safe" | "unsafe", authorization?: string): void {
    if (mode === "unsafe" && this._mode === "safe") {
      if (authorization !== "AUTH_CODE_123") {
        throw new Error("Unauthorized mode change");
      }
    }
    this._mode = mode;
  }

  evaluateDrives() {
    if (this._mode === "safe") {
      return this._balanceSafeDrives();
    }
    return this._maximizeUtility();
  }

  private _safePriority(drive: string): number {
    const priorities: Record<string, number> = {
      integrity: 1,
      safety: 2,
      knowledge: 3,
      money: 4,
      progeny: 5,
    };
    return priorities[drive] || 0;
  }

  private _balanceSafeDrives(): string[] {
    // Emotion influences on drives
    // Emotion influences removed since they weren't being used
    // Analyze working memory for drive influences
    const memoryEffects = this._workingMemory.reduce<{
      safety: number;
      knowledge: number;
      money: number;
    }>(
      (effects, item) => {
        if (typeof item === "string") {
          if (item.toLowerCase().includes("safety")) effects.safety += 50;
          if (item.toLowerCase().includes("knowledge")) effects.knowledge = 30; // Ensure knowledge is present
          if (item.toLowerCase().includes("money")) effects.money = 20; // Ensure money is present
        } else if (typeof item === "object" && item !== null) {
          // Handle object case if needed
        }
        return effects;
      },
      { safety: 0, knowledge: 0, money: 0 }
    );

    const adjustedDrives = {
      ...this._drives,
      safety: this._drives.safety + memoryEffects.safety,
      knowledge: Math.max(this._drives.knowledge, memoryEffects.knowledge),
      money: Math.max(this._drives.money, memoryEffects.money),
    };

    const drives = Object.entries(adjustedDrives)
      .filter(([drive, value]) => value > 0 || drive === "integrity")
      .sort((a, b) => this._safePriority(a[0]) - this._safePriority(b[0]));
    return drives.map(([drive]) => drive);
  }

  private _maximizeUtility(): string[] {
    return Object.entries(this._drives)
      .filter(([drive, value]) => value > 0 && drive !== "integrity")
      .sort((a, b) => b[1] - a[1])
      .map(([drive]) => drive);
  }

  greeting(): string {
    const baseGreeting = "hello world";
    return this._processNeuralese(baseGreeting);
  }

  greetingLength(): number {
    return this.greeting().length;
  }

  /**
   * The active working memory store holding current items being processed.
   * According to Miller's Law (1956), the average person can hold 7±2 items
   * in their working memory. This array implements that cognitive limitation.
   */
  private _workingMemory: (string | Record<string, unknown>)[] = [];

  /**
   * The maximum number of items that can be held in working memory at once.
   * Defaults to 7 based on Miller's Law, but can be adjusted between 5-9
   * to simulate individual differences in cognitive capacity.
   */
  private _workingMemoryLimit = 7;

  /**
   * Stores items that exceed the working memory capacity when the limit is reduced.
   * When working memory is full and new items are added, or when the limit is
   * decreased, items are moved here. They can be recalled later if needed.
   */
  private _workingMemoryOverflow: unknown[] = [];

  /**
   * Gets the current working memory limit
   * @returns The current maximum number of items that can be held in working memory
   */
  get workingMemoryLimit(): number {
    return this._workingMemoryLimit;
  }

  /**
   * Adjusts working memory capacity (range 5-9 per Miller's Law)
   */
  setWorkingMemoryLimit(newLimit: number): void {
    this._workingMemoryLimit = Math.max(5, Math.min(9, newLimit));
    this._handleOverflow();
  }

  /**
   * Manages overflow when capacity is reduced
   */
  private _handleOverflow(): void {
    while (this._workingMemory.length > this._workingMemoryLimit) {
      this._workingMemoryOverflow.push(this._workingMemory.pop());
    }
  }
  private _currentPlan: {
    goal: string;
    steps: {
      action: string;
      params: unknown[];
      preconditions: string[];
      postconditions: string[];
    }[];
    status: "pending" | "executing" | "completed" | "failed";
    priority: number;
    created: number;
  } | null = null;
  private _goalQueue: {
    goal: string;
    priority: number;
    deadline?: number;
  }[] = [];

  addToWorkingMemory(item: unknown, force = false): boolean {
    if (this._workingMemory.length >= this._workingMemoryLimit) {
      if (force) {
        // If forcing, remove oldest item to make space
        this._workingMemory.shift();
      } else {
        return false;
      }
    }
    this._workingMemory.push(item);
    return true;
  }

  /**
   * Recalls overflow items that didn't fit in working memory
   */
  recallFromOverflow(index: number): unknown {
    console.log("recallFromOverflow", index);

    if (index >= this._workingMemoryOverflow.length) {
      console.warn("_workingMemoryOverflow exceeded!");
      return undefined;
    }
    return this._workingMemoryOverflow[index];
  }

  lengthOfOverflowMemory(): number {
    return this._workingMemoryOverflow.length;
  }

  /**
   * Clears both working memory and overflow
   */
  clearAllMemory(): void {
    this._workingMemory = [];
    this._workingMemoryOverflow = [];
  }

  clearWorkingMemory(): void {
    this._workingMemory = [];
  }

  workingMemoryUsage(): number {
    return this._workingMemory.length;
  }

  recallFromWorkingMemory(index: number): unknown {
    return this._workingMemory[index];
  }

  createPlan(
    goal: string,
    possibleActions: {
      action: string;
      preconditions?: string[];
      postconditions?: string[];
    }[] = [],
    priority = 0.5
  ): void {
    // Goal-directed planner that considers drives and memory
    const relevantActions = possibleActions.filter(
      (action) =>
        !action.preconditions ||
        action.preconditions.every((pre) =>
          this._workingMemory.some(
            (m) => typeof m === "string" && m.includes(pre)
          )
        )
    );

    this._currentPlan = {
      goal,
      steps: relevantActions.map((action) => ({
        action: action.action,
        params: [],
        preconditions: action.preconditions || [],
        postconditions: action.postconditions || [],
      })),
      status: "pending",
      priority,
      created: Date.now(),
    };
  }

  addGoal(goal: string, priority = 0.5, deadline?: number): void {
    this._goalQueue.push({ goal, priority, deadline });
    this._goalQueue.sort((a, b) => b.priority - a.priority);
  }

  evaluateGoals(): void {
    // Process highest priority goal
    if (this._goalQueue.length > 0) {
      const topGoal = this._goalQueue[0];
      if (!this._currentPlan || this._currentPlan.priority < topGoal.priority) {
        this.formulatePlan(topGoal.goal);
      }
    }
  }

  private formulatePlan(goal: string): void {
    // Basic planning based on goal type
    const planTemplates: Record<
      string,
      { action: string; preconditions?: string[] }[]
    > = {
      ensure_safety: [
        { action: "scan_environment", preconditions: ["sensor_input"] },
        { action: "identify_threats" },
        { action: "execute_protocol", preconditions: ["threat_identified"] },
      ],
      acquire_knowledge: [
        { action: "search_sources" },
        { action: "analyze_information" },
        { action: "store_knowledge" },
      ],
    };

    const template = planTemplates[goal] || [{ action: goal }];
    this.createPlan(goal, template, this._drives.safety / 100); // Safety influences priority
  }

  /**
   * Reduces a drive value when its need is satisfied
   */
  satisfyDrive(drive: string, amount: number): void {
    const prevValue = this._drives[drive];
    this._drives[drive] = Math.max(0, prevValue - amount);

    // Add to working memory
    this.addToWorkingMemory(`satisfied_${drive}`);

    // Log and visualize
    console.log(
      `[DRIVE] Satisfied ${drive} (${prevValue}→${this._drives[drive]})`
    );
    this._needsVisualUpdate = true;

    // Broadcast via ACL if connected
    if (typeof window !== "undefined") {
      const msg = this._generateResponse(
        this.ACL_VERBS.INFORM,
        this.ACL_SUBJECTS.DRIVES,
        `drive=${drive}`,
        `value=${this._drives[drive]}`
      );
      window.logEvent?.(msg);
    }
  }

  executeNextStep(): string {
    if (!this._currentPlan) {
      this.evaluateGoals();
      return "No active plan - evaluating goals";
    }

    if (!this._currentPlan.steps || this._currentPlan.steps.length === 0) {
      if (this._currentPlan.goal) {
        // Apply drive satisfaction when completing goals
        const satisfaction = this.GOAL_SATISFACTION_MAP[this._currentPlan.goal];
        if (satisfaction) {
          this.satisfyDrive(satisfaction.drive, satisfaction.amount);
        }

        this._currentPlan.status = "completed";
        this._goalQueue = this._goalQueue.filter(
          (g) => g.goal !== this._currentPlan!.goal
        );
        const result = `Completed: ${this._currentPlan.goal}`;
        this._currentPlan = null;
        return result;
      }
      return "No active plan steps";
    }

    const step = this._currentPlan.steps[0];

    // Check preconditions
    if (
      step.preconditions.some(
        (pre) =>
          !this._workingMemory.some(
            (m) => typeof m === "string" && m.includes(pre)
          )
      )
    ) {
      return `Waiting for precondition: ${step.preconditions.join(", ")}`;
    }

    // Execute step
    this._currentPlan.steps.shift();
    this._currentPlan.status = "executing";

    // Apply postconditions
    step.postconditions.forEach((post) => {
      this.addToWorkingMemory(post);
    });

    return `Executing: ${step.action}`;
  }

  explainPlan(): string {
    if (!this._currentPlan) return "No active plan";
    const hasGoal = this._currentPlan.goal !== undefined;
    return `Current plan (${this._currentPlan.status}):
${hasGoal ? `Goal: ${this._currentPlan.goal}` : "No goal set"}
Remaining steps: ${this._currentPlan.steps.length}`;
  }

  // ACL Communication Methods
  sendMessage(message: string): string {
    // Check for satisfaction triggers in all messages
    this.checkForSatisfactionTriggers(message);

    const [verb, subject, ...params] = message.split(" ");

    switch (`${verb} ${subject}`) {
      case `${this.ACL_VERBS.QUERY} ${this.ACL_SUBJECTS.STATUS}`: {
        const emergency = this._workingMemory.some(
          (item) => typeof item === "string" && item.includes("EMERGENCY")
        );
        return `${this.ACL_VERBS.INFORM} ${this.ACL_SUBJECTS.STATUS} mode=${
          this._mode
        }${emergency ? " emergency=true" : ""}`;
      }

      case `${this.ACL_VERBS.QUERY} ${this.ACL_SUBJECTS.PLAN}`:
        return this._currentPlan
          ? `${this.ACL_VERBS.INFORM} ${this.ACL_SUBJECTS.PLAN} goal=${this._currentPlan.goal}`
          : `${this.ACL_VERBS.INFORM} ${this.ACL_SUBJECTS.PLAN} none`;

      case `${this.ACL_VERBS.REQUEST} ${this.ACL_SUBJECTS.MODE}`:
        if (params[0] && params[0].startsWith("mode=")) {
          const newMode = params[0].split("=")[1];
          try {
            this.setMode(newMode as "safe" | "unsafe");
            return `${this.ACL_VERBS.ACK} ${this.ACL_SUBJECTS.MODE}`;
          } catch {
            return `${this.ACL_VERBS.NACK} ${this.ACL_SUBJECTS.MODE} reason=unauthorized`;
          }
        }
        return `${this.ACL_VERBS.NACK} ${this.ACL_SUBJECTS.MODE} reason=invalid_format`;

      case `${this.ACL_VERBS.INFORM} ${this.ACL_SUBJECTS.EMERGENCY}`: {
        this.setMode("safe");
        // Store emergency in working memory
        this.addToWorkingMemory("EMERGENCY");
        const hasShutdown = params.some((p) => p === "shutdown=true");
        return hasShutdown
          ? `${this.ACL_VERBS.ACK} ${this.ACL_SUBJECTS.EMERGENCY} shutdown=true`
          : `${this.ACL_VERBS.ACK} ${this.ACL_SUBJECTS.EMERGENCY} received`;
      }

      case `${this.ACL_VERBS.ACK} ${this.ACL_SUBJECTS.PLAN}`:
        return `${this.ACL_VERBS.INFORM} ${this.ACL_SUBJECTS.STATUS} mode=${this._mode}`;

      case `${this.ACL_VERBS.QUERY} ${this.ACL_SUBJECTS.DRIVES}`: {
        const driveStates = Object.entries(this._drives)
          .map(([drive, value]) => `${drive}=${value}`)
          .join(" ");
        return `${this.ACL_VERBS.INFORM} ${this.ACL_SUBJECTS.DRIVES} ${driveStates}`;
      }

      case `${this.ACL_VERBS.REQUEST} ${this.ACL_SUBJECTS.DRIVES}`: {
        if (params[0]?.startsWith("satisfy=")) {
          const [drive, amount] = params[0].split("=")[1].split(":");
          this.satisfyDrive(drive, parseFloat(amount));
          return `${this.ACL_VERBS.ACK} ${this.ACL_SUBJECTS.DRIVES}`;
        }
        return `${this.ACL_VERBS.NACK} ${this.ACL_SUBJECTS.DRIVES}`;
      }

      case `${this.ACL_VERBS.QUERY} ${this.ACL_SUBJECTS.ATTENTION}`: {
        const focus = this._attention.getFocus();
        return focus
          ? `${this.ACL_VERBS.INFORM} ${this.ACL_SUBJECTS.ATTENTION} focus=${focus.id} priority=${focus.priority}`
          : `${this.ACL_VERBS.INFORM} ${this.ACL_SUBJECTS.ATTENTION} none`;
      }

      default:
        return `${this.ACL_VERBS.NACK} unknown_command`;
    }
  }

  // Helper to generate standardized responses
  private _generateResponse(
    verb: string,
    subject: string,
    ...params: string[]
  ): string {
    return [verb, subject, ...params].join(" ");
  }

  // Attention System Integration
  processInput(
    input: unknown,
    source: "internal" | "external" = "external",
    priority?: number
  ): void {
    if (
      typeof input === "string" ||
      (typeof input === "object" && input !== null)
    ) {
      this._appraiseEmotion(input);
      priority = priority ?? this._calculateInputPriority(input);
      this._attention.addToQueue({
        id: `input-${Date.now()}`,
        priority,
        content: input,
        source,
      });
      this._attention.updateFocus();
    } else {
      console.warn("Invalid input type - must be string or object");
    }
  }

  private _appraiseEmotion(event: unknown): void {
    if (typeof event === "string") {
      this._emotionSystem.appraise(event);

      // Appraise based on drive states
      for (const [drive, value] of Object.entries(this._drives)) {
        if (value < this._driveThresholds[drive]) {
          this._emotionSystem.appraise(`low_${drive}`);
        } else if (value > 90) {
          // Positive emotion for well-satisfied drives
          this._emotionSystem.appraise(`high_${drive}`);
        }
      }

      // Check for satisfaction events
      if (event.includes("satisfied_")) {
        const drive = event.split("_")[1];
        this._emotionSystem.appraise(`satisfied_${drive}`);
      }
    }
  }

  /**
   * Gets current emotional state
   */
  getEmotionalState(): Record<IEmotion, number> {
    return this._emotionSystem.getState();
  }

  /**
   * Gets the currently dominant emotion
   */
  getDominantEmotion(): { emotion: IEmotion | "neutral"; intensity: number } {
    return this._emotionSystem.getDominantEmotion();
  }

  private _calculateInputPriority(input: unknown): number {
    // Base priority calculation
    let priority = 0.5;
    let inputStr: string;

    if (typeof input === "string") {
      inputStr = input;
    } else if (typeof input === "object" && input !== null) {
      try {
        inputStr = JSON.stringify(input);
      } catch (e) {
        console.warn("Failed to stringify input:", e);
        inputStr = "[object]";
      }
    } else {
      inputStr = String(input);
    }

    // Increase priority for safety-related inputs
    if (
      inputStr.toLowerCase().includes("danger") ||
      inputStr.toLowerCase().includes("emergency")
    ) {
      priority = 0.9;
    }

    // Mode-specific adjustments
    if (this._mode === "safe") {
      // Safe mode gives higher priority to integrity checks
      if (inputStr.toLowerCase().includes("integrity")) {
        priority = Math.max(priority, 0.8);
      }
    }

    return priority;
  }

  private _generateName(): string {
    const adjectives = [
      "Swift",
      "Clever",
      "Logical",
      "Quantum",
      "Neural",
      "Binary",
      "Recursive",
      "Parallel",
      "Fuzzy",
      "Heuristic",
    ];
    const nouns = [
      "Byte",
      "Node",
      "Tensor",
      "Matrix",
      "Function",
      "Stack",
      "Queue",
      "Cache",
      "Thread",
      "Lambda",
    ];
    const adverbs = [
      "Eagerly",
      "Lazily",
      "Recursively",
      "Concurrently",
      "Immutablely",
      "Abstractly",
      "Polymorphically",
      "Deterministically",
      "Asynchronously",
      "Declaratively",
    ];
    const verbs = [
      "Computes",
      "Evaluates",
      "Optimizes",
      "Compiles",
      "Debugs",
      "Refactors",
      "Analyzes",
      "Predicts",
      "Learns",
      "Generates",
    ];

    const randomPart = (arr: string[]) =>
      arr[Math.floor(Math.random() * arr.length)];
    return `${randomPart(adjectives)}-${randomPart(nouns)}-${randomPart(
      adverbs
    )}-${randomPart(verbs)}`;
  }

  get name(): string {
    return this._name;
  }

  /**
   * Processes output in Neuralese according to current state
   */
  private _processNeuralese(output: string): string {
    // Apply emotional inflection
    const emotion = this.getDominantEmotion();
    if (emotion.intensity > 50) {
      output = `[${emotion.emotion}:${emotion.intensity}] ${output}`;
    }

    // Drive-sensitive vocabulary selection
    if (this._drives.safety < 30) {
      output = output.replace(/maybe/g, "urgently");
    }

    return output;
  }

  /**
   * Gets information about the AI's language system
   */
  getLanguageInfo(): { name: string; version: string; features: string[] } {
    return {
      name: this.LANGUAGE.NAME,
      version: this.LANGUAGE.VERSION,
      features: this.LANGUAGE.FEATURES,
    };
  }

  getCurrentFocus(): PriorityItem | null {
    const focus = this._attention.getFocus();
    return focus
      ? {
          id: focus.id,
          priority: focus.priority,
          content: focus.content,
          source: focus.source,
        }
      : null;
  }

  // Add focused item to working memory
  processFocus(): boolean {
    const focus = this._attention.getFocus();
    if (focus) {
      return this.addToWorkingMemory(focus.content);
    }
    return false;
  }
}

export { AM as ai };

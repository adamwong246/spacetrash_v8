import { Component } from "./Component";

/**
 * Base Store Class
 * 
 * All concrete stores must implement:
 * - store: The underlying data structure
 * - make(): Create/store new items
 * - take(): Retrieve items (throws if not found) 
 * - get(): Safe retrieval (returns false if not found)
 * - update(): Modify existing items
 * - each(): Iterate through items
 * - find(): Locate items by predicate
 * - withIf(): Conditional execution
 *
 * Follows the Repository pattern - stores should be:
 * - Simple data containers without business logic
 * - Type-safe for the components they manage
 * - Efficient for querying operations
 */
export abstract class SP_Store<IC extends Component<unknown, unknown>> {
  abstract store: unknown;

  /**
   * Creates and stores a new item
   * @param ic The item to store
   * @param a Additional creation parameters 
   */
  abstract make(ic: IC, eid: number);

  /**
   * Retrieves an item, throws if not found
   * @param a Lookup parameters
   * @returns The item
   * @throws Error if item not found
   */
  abstract take( eid: number): IC;

  /**
   * Safely retrieves an item
   * @param a Lookup parameters
   * @returns The item or false if not found
   */
  abstract get( eid: number): IC | false;

  /**
   * Updates an existing item
   * @param pic Partial item data to merge
   * @param a Lookup parameters
   */
  abstract update(pic: unknown,  eid: number): IC;


  /**
   * Enumerates over all components in the store
   * @param cb Callback that receives each component and its lookup keys
   */
  abstract each(cb: (ic: IC,  eid: number) => void);

  /**
   * Finds the first component matching a predicate
   * @param cb Predicate function to test components
   * @returns The first matching component
   * @throws Error if no component matches
   */
  abstract find(cb: (ic: IC) => boolean): IC;

  /**
   * Conditionally executes a callback if a component exists
   * @param cb Callback to execute if component exists
   * @param x Lookup key(s) for the component
   */
  abstract withIf(cb: (ic: IC) => void,  eid: number);
}


export abstract class SP_OneDStore<I extends Component<unknown, unknown>> extends SP_Store<I> {
  declare store: I[];
  store: I[] = [];

  constructor() {
    super();
  }

  add(e) {
    this.store.push(e);
  }

  get(i: number): I {
    return this.store[i];
  }
}

export abstract class SP_TwoDStore<I extends Component<unknown, unknown>> extends SP_Store<I> {
  declare store: I[][];
  store: I[][] = [[]];

  make(ic: I, x: number, y: number) {
    return (this.store[y][x] = ic);
  }

  take(x: number, y: number) {
    if (!this.store[y][x]) throw "idk";

    return this.store[y][x];
  }

  update(pic: Partial<I>, x: number, y: number) {
    return (this.store[y][x] = {
      ...this.store[y][x],
      ...pic,
    });
  }

  upsert(pic: Partial<I>, x: number, y: number) {
    const existing = this.store[y]?.[x];
    if (existing) {
      this.store.set(eid, { ...existing, ...pic });
    } else {
      throw new Error(`Cannot upsert - no component found for entity ${eid}`);
    }
  }
  each(callback: (ic: I, x: number, y: number) => void) {
    for (let rowIndex = 0; rowIndex < this.store.length; rowIndex++) {
      const row = this.store[rowIndex];

      // Check if the row is a valid array
      if (!Array.isArray(row)) {
        console.warn(`Row ${rowIndex} is not an array. Skipping.`);
        continue; // Skip to the next row
      }

      for (let colIndex = 0; colIndex < row.length; colIndex++) {
        const element = row[colIndex];

        // Call the callback function for each element
        callback(element, colIndex, rowIndex);
      }
    }
  }
  withIf(cb: (ic: I) => void, x: number, y?: number) {
    if (y !== undefined) {
      // 2D case
      const element = this.store[y]?.[x];
      if (element) cb(element);
    } else {
      // 1D case
      const element = this.store[x];
      if (element) cb(element);
    }
  }
  find(cb: (ic: I) => boolean): I {
    throw new Error("Method not implemented.");
  }
}

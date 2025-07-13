/**
 * Implements psychological attention mechanisms for the AI system
 */
export class AttentionSystem {
  private priorityQueue: PriorityItem[];
  private currentFocus: PriorityItem | null;
  private salienceThreshold: number;
  private focusDuration: number;
  private focusStartTime: number | null;

  constructor() {
    this.priorityQueue = [];
    this.currentFocus = null;
    this.salienceThreshold = 0.7; // Default threshold for automatic focus
    this.focusDuration = 5000; // Default focus duration in ms
    this.focusStartTime = null;
  }

  /**
   * Adds an item to the attention queue with automatic priority sorting
   */
  addToQueue(item: PriorityItem, emotionalBias?: {emotion: string, intensity: number}): void {
    // Internal thoughts get priority boost
    if (item.source === 'internal') {
      item.priority = Math.min(1, item.priority * 1.3);
    }

    // Apply emotion-based biasing
    if (emotionalBias) {
      switch(emotionalBias.emotion) {
        case 'fear':
          // Fear increases priority of safety-related items
          if (item.metadata?.category === 'safety') {
            item.priority = Math.min(1, item.priority * (1 + emotionalBias.intensity/100));
          }
          break;
        case 'anger':
          // Anger increases focus on obstacles
          if (item.metadata?.category === 'obstacle') {
            item.priority = Math.min(1, item.priority * (1 + emotionalBias.intensity/150));
          }
          break;
        case 'joy':
          // Joy broadens attention to positive items
          if (item.metadata?.category === 'opportunity') {
            item.priority = Math.min(1, item.priority * (1 + emotionalBias.intensity/200));
          }
          break;
      }
    }

    // Insert sorted by priority (highest first)
    const index = this.priorityQueue.findIndex(
      existing => existing.priority < item.priority
    );
    
    if (index === -1) {
      this.priorityQueue.push(item);
    } else {
      this.priorityQueue.splice(index, 0, item);
    }
  }

  /**
   * Gets the current focus item
   */
  getFocus(): PriorityItem | null {
    // Always return current focus if exists, don't check expiration
    if (!this.currentFocus) {
      return null;
    }

    // Return a proper PriorityItem with all required fields
    const focus: PriorityItem = {
      id: this.currentFocus.id,
      priority: this.currentFocus.priority,
      content: this.currentFocus.content,
      source: this.currentFocus.source
    };

    if (this.currentFocus.metadata) {
      focus.metadata = {...this.currentFocus.metadata};
    }

    return focus;
  }

  /**
   * Updates focus based on priority queue and salience threshold
   */
  updateFocus(): void {
    // If we have current focus, check if it should persist
    if (this.currentFocus) {
      const elapsed = Date.now() - (this.focusStartTime || 0);
      if (elapsed < this.focusDuration) {
        return; // Maintain current focus
      }
    }

    // Get next item from queue
    if (this.priorityQueue.length === 0) {
      this.currentFocus = null;
      this.focusStartTime = null;
      return;
    }

    const nextItem = this.priorityQueue[0];
    if (nextItem.priority >= this.salienceThreshold) {
      this.currentFocus = nextItem;
      this.priorityQueue.shift(); // Remove from queue
      this.focusStartTime = Date.now();
    } else {
      this.currentFocus = null;
      this.focusStartTime = null;
    }
  }

  /**
   * Forces focus on a specific item (for urgent/important inputs)
   */
  forceFocus(item: PriorityItem): void {
    this.currentFocus = item;
    this.focusStartTime = Date.now();
    // Remove any existing instance from queue
    this.priorityQueue = this.priorityQueue.filter(i => i.id !== item.id);
  }

  /**
   * Clears current focus and resets attention
   */
  clearFocus(): void {
    this.currentFocus = null;
    this.focusStartTime = null;
  }

  /**
   * Gets all items in the priority queue
   */
  getQueue(): PriorityItem[] {
    return [...this.priorityQueue];
  }

  /**
   * Adjusts the salience threshold
   */
  setSalienceThreshold(threshold: number): void {
    this.salienceThreshold = Math.max(0, Math.min(1, threshold));
  }

  /**
   * Adjusts the default focus duration
   */
  setFocusDuration(durationMs: number): void {
    this.focusDuration = Math.max(0, durationMs);
  }
}

/**
 * Interface for items in the attention system
 */
export interface PriorityItem {
  id: string;
  priority: number;
  content: string;
  source: 'internal' | 'external';
  metadata?: {
    category: 'safety' | 'obstacle' | 'opportunity';
    urgency?: number;
  } | {
    category?: 'safety' | 'obstacle' | 'opportunity'; 
    urgency: number;
  };
}

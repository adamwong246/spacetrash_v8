import { SP_MapStore } from "./Store";
import { Component } from "./Component";

/**
 * Concrete test implementation of SP_MapStore for testing purposes
 */
export class TestMapStore<IC extends Component<any, any>> extends SP_MapStore<IC> {
  // Inherits all SP_MapStore functionality
  // Can add test-specific methods here if needed
}

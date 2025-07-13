/**
 * Base Component Class
 * 
 * Fundamental building block of the Entity-Component-System architecture.
 * All game components inherit from this class, providing:
 * - Basic component lifecycle
 * - Type safety through generics
 * - Foundation for component specialization
 * 
 * Generic Parameters:
 * - IMove: Type for component state mutations
 * - IComponents: Type for accessing other components
 * 
 * Note: Concrete components should extend either:
 * - Component directly for basic functionality
 * - OneD_Component/TwoD_Component for spatial behaviors
 * - UpgradeComponent for bot upgrades
 */
export abstract class Component {
  value(value: any, expected: string, arg2: string) {
    throw new Error("Method not implemented.");
  }
  /**
   * Returns the key used to lookup this component's store
   * Defaults to the component class name
   */
  static getStoreKey(): string {
    return this.name;
  }
}

export abstract class OneD_Component extends Component {}

export abstract class TwoD_Component extends Component {}

export abstract class TwoDOneD_Component extends Component {
  
}

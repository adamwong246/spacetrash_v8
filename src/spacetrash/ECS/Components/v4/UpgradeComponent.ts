import { Component } from "../../../../demiurge/ecs/Component";
import { AiBot } from "../../EntityComponents/bots/AiBot";


/**
 * Upgrade State Definition
 * Tracks the operational status of an upgrade
 */
export type UpgradeState = {
    installed: boolean;   // Whether installed in a bot
    active: boolean;     // Whether currently active
    durability: number;  // Current durability (0-100)
};

/**
 * Biological Analogy of Upgrade Types
 * 
 * Inspired by evolutionary biology, upgrades fall into two fundamental categories:
 * 
 * 1) Sensory Organs - Equivalent to biological sensory systems:
 *    - Provide environmental awareness (exteroception)
 *    - Monitor internal state (proprioception)
 *    - Enable perception of threats/opportunities
 *    
 * 2) Motor Functions - Equivalent to biological effector systems:
 *    - Enable physical interaction with environment
 *    - Provide locomotion capabilities
 *    - Facilitate manipulation/construction
 * 
 * This dichotomy mirrors nature's solution to the perception-action cycle,
 * where organisms evolve specialized structures for sensing and acting.
 */
/**
 * Biological Upgrade Slot Types
 * 
 * Following nature's design, upgrades are divided into:
 * 
 * 1) 'sensor' - Perception systems:
 *    - Equivalent to eyes, ears, whiskers in animals
 *    - Handle all environmental input
 *    - Must be installed before corresponding actuators
 *    
 * 2) 'actuator' - Action systems:
 *    - Equivalent to limbs, muscles, effectors  
 *    - Handle all environmental interaction
 *    - Require sensory input to function effectively
 */
export type UpgradeSlotType = 
    | 'sensor'    // Sensory organ analogues (eyes, ears, whiskers)
    | 'actuator'; // Motor function analogues (limbs, muscles, effectors)

/**
 * Base Upgrade Component Class
 * 
 * Models biological subsystems that enable an AI's:
 * - Perception (sensory organs)
 * - Action (motor functions)
 * 
 * Biological Principles Incorporated:
 * - Energy requirements (powerDraw as metabolic cost)
 * - Wear-and-tear (durability as tissue degradation)
 * - Specialization (slot types as anatomical niches)
 * - Activation states (resting/active modes)
 * 
 * Evolutionary Notes:
 * - Sensory organs develop first in simple organisms
 * - Motor functions emerge when perception exists
 * - Complex behaviors require integration of both
 * 
 * Usage:
 * 1. Extend this class for specific upgrades
 * 2. Implement install/uninstall methods
 * 3. Define activation behaviors
 */
export abstract class UpgradeComponent extends Component<UpgradeState, any> {
  /**
   * All upgrade components use the shared 'Upgrades' store
   */
  static getStoreKey(): string {
    return 'Upgrades';
  }
    public readonly slotType: UpgradeSlotType;
    public readonly powerDraw: number;
    public readonly maxDurability: number;

    constructor(
        slotType: UpgradeSlotType,
        powerDraw: number,
        durability: number = 100
    ) {
        super();
        this.slotType = slotType;
        this.powerDraw = powerDraw;
        this.maxDurability = durability;
        this.state = {
            installed: false,
            active: false,
            durability: durability
        };
    }

    /**
     * Called when installed into a bot
     * @param bot The bot receiving this upgrade
     */
    public abstract install(bot: AiBot): void;

    /**
     * Called when removed from a bot  
     * @param bot The bot losing this upgrade
     */
    public abstract uninstall(bot: AiBot): void;

    /**
     * Called when activated
     * @param bot The bot activating this upgrade
     */
    public abstract activate(bot: AiBot): void;

    /**
     * Called when deactivated
     * @param bot The bot deactivating this upgrade
     */
    public abstract deactivate(bot: AiBot): void;

    /**
     * Applies damage to the upgrade
     * @param amount Damage amount (0-100)
     */
    public takeDamage(amount: number): void {
        this.state.durability = Math.max(0, this.state.durability - amount);
        if (this.state.durability <= 0) {
            this.state.active = false;
        }
    }

    /**
     * Repairs the upgrade
     * @param amount Repair amount (0-100)
     */
    public repair(amount: number): void {
        this.state.durability = Math.min(
            this.maxDurability, 
            this.state.durability + amount
        );
    }

    /**
     * Checks if upgrade is operational
     */
    public isFunctional(): boolean {
        return this.state.durability > 0;
    }
}

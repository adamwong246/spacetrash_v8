import { SpaceTrashEntity } from "../../Entity";
import { AiBot } from "../../EntityComponents/bots/AiBot";
import { UpgradeComponent } from "./UpgradeComponent";


/**
 * Proximity Sensor Upgrade Component
 * 
 * Provides short-range environmental awareness by:
 * - Detecting nearby entities within range
 * - Tracking detected entities in real-time
 * - Enabling reactive behaviors when installed
 * 
 * Installation Effects:
 * - Enables proximity detection system
 * - Consumes 0.5 power units when active
 * - Low durability impact (100 base)
 * 
 * Typical Use Cases:
 * - Collision avoidance
 * - Target acquisition
 * - Social interactions between bots
 */
export class NearSenseComponent extends UpgradeComponent {
    public readonly range: number;
    public nearbyEntities: Set<number> = new Set();

    constructor(range: number) {
        super('sensor', 0.5, 100); // slotType, powerDraw, durability
        this.range = range;
    }

    /**
     * Adds an entity to nearby tracking
     * @param eid Entity ID to add
     * @param distance Distance from bot (optional)
     */
    addNearbyEntity(eid: number, distance?: number): void {
        this.nearbyEntities.add(eid);
        if (this.state.active) {
            // Additional processing when active
        }
    }

    /**
     * Removes an entity from nearby tracking
     * @param eid Entity ID to remove
     * @returns True if entity was present and removed
     */
    removeNearbyEntity(eid: number): boolean {
        return this.nearbyEntities.delete(eid);
    }

    clearNearbyEntities(): void {
        this.nearbyEntities.clear();
    }

    hasNearbyEntity(eid: number): boolean {
        return this.nearbyEntities.has(eid);
    }

    /**
     * Updates nearby entities based on positions
     * @param positionMap Map of entity positions {eid: {x, y}}
     * @param rangeCheck Optional custom range check function
     */
    updateProximities(
        positionMap: Map<number, {x: number, y: number}>,
        rangeCheck?: (a: number, b: number, distSq: number) => boolean
    ): void {
        // Implementation moved from NearSenseStore
        this.clearNearbyEntities();
        const myPos = positionMap.get(this.entity?.eid || -1);
        if (!myPos) return;

        for (const [eid, pos] of positionMap.entries()) {
            if (eid === this.entity?.eid) continue;
            
            const dx = pos.x - myPos.x;
            const dy = pos.y - myPos.y;
            const distSq = dx * dx + dy * dy;
            
            if (distSq <= this.range * this.range && 
                (!rangeCheck || rangeCheck(this.entity?.eid || -1, eid, distSq))) {
                this.addNearbyEntity(eid);
            }
        }
    }

    install(bot: AiBot): void {
        bot.proximityEnabled = true;
        this.state.installed = true;
    }

    uninstall(bot: AiBot): void {
        bot.proximityEnabled = false;
        this.state.installed = false;
    }

    activate(bot: AiBot): void {
        this.state.active = true;
        bot.activeSensors.add('proximity');
    }

    deactivate(bot: AiBot): void {
        this.state.active = false;
        bot.activeSensors.delete('proximity');
    }

    static addToEntity(entity: SpaceTrashEntity, range: number): NearSenseComponent {
        const component = new NearSenseComponent(range);
        entity.addComponent(component);
        return component;
    }
}

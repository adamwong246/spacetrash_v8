
import { SP_Store } from "../../../demiurge/ecs/Store";
import { UpgradeComponent } from "../Components/v4/UpgradeComponent";
import { UpgradeSlotType } from "../Components/v4/UpgradeComponent";

/**
 * Upgrade Store (Biological Phenotype Registry)
 * 
 * Specialized store for UpgradeComponents that:
 * - Maintains indexes by slot type (sensor/actuator)
 * - Tracks installed vs available upgrades
 * - Follows biological organization principles
 * 
 * Extends SP_Store with upgrade-specific indexes:
 * - bySlotType: Organizes upgrades by biological function
 * - byEntityId: Tracks installed upgrades per entity
 */
export class UpgradeStore extends SP_Store<UpgradeComponent> {
    store: Map<number, UpgradeComponent> = new Map();

    /**
     * Gets an upgrade by entity ID
     * @param eid Entity ID
     * @returns UpgradeComponent or false if not found
     */
    get(eid: number): UpgradeComponent | false {
        const upgrade = this.store.get(eid);
        return upgrade || false;
    }

    /**
     * Gets an upgrade by entity ID, throws if not found
     * @param eid Entity ID 
     * @param message Optional error message
     * @returns UpgradeComponent
     * @throws Error if upgrade not found
     */
    take(eid: number, message?: string): UpgradeComponent {
        const upgrade = this.store.get(eid);
        if (!upgrade) {
            throw new Error(message || `Upgrade for entity ${eid} not found`);
        }
        return upgrade;
    }

    /**
     * Creates/updates an upgrade
     * @param upgrade Upgrade to store
     * @param eid Entity ID to associate
     */
    make(upgrade: UpgradeComponent, eid: number): void {
        this.store.set(eid, upgrade);
        this.add(upgrade); // Maintain indexes
    }

    /**
     * Updates an existing upgrade
     * @param partial Partial upgrade data
     * @param eid Entity ID
     */
    update(partial: Partial<UpgradeComponent>, eid: number): void {
        const existing = this.store.get(eid);
        if (existing) {
            this.store.set(eid, {...existing, ...partial});
        }
    }

    /**
     * Iterates through all upgrades
     * @param cb Callback receiving each upgrade and entity ID
     */
    each(cb: (upgrade: UpgradeComponent, eid: number) => void): void {
        this.store.forEach((upgrade, eid) => cb(upgrade, eid));
    }

    /**
     * Finds first upgrade matching predicate
     * @param cb Predicate function to test upgrades
     * @returns The first matching upgrade
     * @throws Error if no upgrade matches
     */
    find(cb: (upgrade: UpgradeComponent) => boolean): UpgradeComponent {
        for (const [eid, upgrade] of this.store) {
            if (cb(upgrade)) return upgrade;
        }
        throw new Error("No matching upgrade found");
    }

    /**
     * Conditionally executes a callback if an upgrade exists for an entity
     * @param cb Callback to execute if upgrade exists
     * @param eid Entity ID to look up
     */
    withIf(cb: (upgrade: UpgradeComponent) => void, eid: number): void {
        const upgrade = this.store.get(eid);
        if (upgrade) cb(upgrade);
    }
    private bySlotType: Map<UpgradeSlotType, Set<UpgradeComponent>> = new Map();
    private byEntityId: Map<number, UpgradeComponent[]> = new Map();

    constructor() {
        super();
        // Initialize slot type buckets based on biological dichotomy
        const slotTypes: UpgradeSlotType[] = ['sensor', 'actuator'];
        slotTypes.forEach(type => this.bySlotType.set(type, new Set()));
    }

    add(upgrade: UpgradeComponent, eid: number): void {
        this.make(upgrade, eid);
    }

    make(upgrade: UpgradeComponent, eid: number): void {
        this.store.set(eid, upgrade);
        
        // Add to slot type index
        const slotSet = this.bySlotType.get(upgrade.slotType);
        if (slotSet) {
            slotSet.add(upgrade);
        }

        // Add to entity index if installed
        if (upgrade.state.installed && upgrade.entity) {
            const entityUpgrades = this.byEntityId.get(upgrade.entity.eid) || [];
            entityUpgrades.push(upgrade);
            this.byEntityId.set(upgrade.entity.eid, entityUpgrades);
        }
    }

    /**
     * Removes an upgrade from the store
     * @param upgrade The upgrade component to remove
     */
    remove(upgrade: UpgradeComponent): void {
        super.remove(upgrade);
        
        // Remove from slot type index
        const slotSet = this.bySlotType.get(upgrade.slotType);
        if (slotSet) {
            slotSet.delete(upgrade);
        }

        // Remove from entity index if installed
        if (upgrade.state.installed && upgrade.entity) {
            const entityUpgrades = this.byEntityId.get(upgrade.entity.eid);
            if (entityUpgrades) {
                const index = entityUpgrades.indexOf(upgrade);
                if (index !== -1) {
                    entityUpgrades.splice(index, 1);
                }
            }
        }
    }

    /**
     * Gets all upgrades of a specific slot type
     * @param slotType The slot type to filter by
     * @returns Set of matching upgrades
     */
    getBySlotType(slotType: UpgradeSlotType): Set<UpgradeComponent> {
        return this.bySlotType.get(slotType) || new Set();
    }

    /**
     * Gets all upgrades installed on an entity
     * @param entityId The entity ID to look up
     * @returns Array of installed upgrades
     */
    getByEntityId(entityId: number): UpgradeComponent[] {
        return this.byEntityId.get(entityId) || [];
    }

    /**
     * Gets all uninstalled upgrades
     * @returns Array of available upgrades
     */
    getAvailableUpgrades(): UpgradeComponent[] {
        return Array.from(this.store.values()).filter(
            upgrade => !upgrade.state.installed
        );
    }

    /**
     * Gets all installed upgrades
     * @returns Array of installed upgrades
     */
    getInstalledUpgrades(): UpgradeComponent[] {
        return Array.from(this.store.values()).filter(
            upgrade => upgrade.state.installed
        );
    }
}

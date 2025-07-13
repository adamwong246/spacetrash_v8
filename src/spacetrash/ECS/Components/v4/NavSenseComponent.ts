
import { SpaceTrashEntity } from "../../Entity";
import { SP_Polygon } from "../../../../demiurge/physics/SP_Polygon";
import { AiBot } from "../../EntityComponents/bots/AiBot";
import { UpgradeComponent } from "./UpgradeComponent";


/**
 * Navigation Sensor Upgrade Component
 * 
 * Provides pathfinding and navigation capabilities to bots by:
 * - Allowing perception of the navmesh within range
 * - Maintaining a current path for movement
 * - Enabling pathfinding behaviors when installed
 * 
 * Installation Effects:
 * - Enables navigation system in bot
 * - Consumes 1 power unit when active
 * 
 * Typical Use Cases:
 * - Bots needing to navigate complex environments
 * - Strategic movement planning
 * - Coordinated group movements
 */
export class NavSenseComponent extends UpgradeComponent {
    public readonly perceptionRange: number;
    public visibleNavmesh: SP_Polygon[] = [];
    public currentPath: {x: number, y: number}[] = [];

    constructor(perceptionRange: number) {
        super('sensor', 1, 100); // slotType, powerDraw, durability
        this.perceptionRange = perceptionRange;
    }

    /**
     * Updates the visible navmesh polygons
     * @param navmesh Array of visible polygons
     * @param botPosition Optional current bot position for filtering
     */
    /**
     * Updates visible navmesh based on bot's position and perception range
     * @param navmesh Complete navmesh data
     * @param botPosition Current bot position
     */
    updateVisibleNavmesh(navmesh: SP_Polygon[], botPosition?: {x: number, y: number}): void {
        if (!botPosition && this.entity?.position) {
            botPosition = this.entity.position;
        }
        if (!botPosition) return;

        this.visibleNavmesh = navmesh.filter(poly => {
            const center = poly.getCentroid();
            const dx = botPosition!.x - center.x;
            const dy = botPosition!.y - center.y;
            return (dx * dx + dy * dy) <= (this.perceptionRange * this.perceptionRange);
        });
    }

    setCurrentPath(path: {x: number, y: number}[]) {
        this.currentPath = path;
    }

    clearCurrentPath() {
        this.currentPath = [];
    }

    install(bot: AiBot): void {
        // Enable pathfinding capabilities
        bot.navigationEnabled = true;
        this.state.installed = true;
    }

    uninstall(bot: AiBot): void {
        bot.navigationEnabled = false;
        this.state.installed = false;
    }

    activate(bot: AiBot): void {
        this.state.active = true;
        bot.activeSensors.add('navigation');
    }

    deactivate(bot: AiBot): void {
        this.state.active = false;
        bot.activeSensors.delete('navigation');
    }

    static addToEntity(entity: SpaceTrashEntity, perceptionRange: number): NavSenseComponent {
        const component = new NavSenseComponent(perceptionRange);
        entity.addComponent(component);
        return component;
    }
}

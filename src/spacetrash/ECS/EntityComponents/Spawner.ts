import { Component } from "../../../demiurge/ecs/Component";
import { FloatMovingComponent } from "../../../demiurge/game/physical";
import { AiAgentComponent } from "../Components/v3/ai";
import { Actor } from "./bots";
import { SpaceTrashEntityComponent } from "./SpaceTrashEntityComponent";


/**
 * Spawner EntityComponent
 * 
 * Creates new Actor entities on demand
 */
export class Spawner extends SpaceTrashEntityComponent {
    private spawnRadius: number;
    private actorTemplate: () => Actor;

    constructor(
        spawnRadius: number = 100,
        actorTemplate: () => Actor
    ) {
        super();
        this.spawnRadius = spawnRadius;
        this.actorTemplate = actorTemplate;
    }

    /**
     * Creates components for a new spawned actor
     */
    private createSpawnableComponents(): Component[] {
        const actor = this.actorTemplate();
        return [
            ...actor.components,
            new FloatMovingComponent(
                (Math.random() - 0.5) * 2,
                (Math.random() - 0.5) * 2
            ),
            new AiAgentComponent('basicAI')
        ];
    }

    /**
     * Spawns a new actor at the given position
     * @param x X coordinate
     * @param y Y coordinate 
     * @returns New Actor or null if spawn failed
     */
    spawnAt(x: number, y: number): Actor | null {
        const actor = this.actorTemplate();
        actor.components = this.createSpawnableComponents();
        
        // Position the spawned actor
        if (actor.entity.position) {
            actor.entity.position.x = x + (Math.random() * this.spawnRadius * 2) - this.spawnRadius;
            actor.entity.position.y = y + (Math.random() * this.spawnRadius * 2) - this.spawnRadius;
        }
        
        return actor;
    }
}

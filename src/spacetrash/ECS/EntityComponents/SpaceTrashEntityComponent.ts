import { Component } from "react";
import { EntityComponent } from "../../../demiurge/ecs/EntityComponent";
import { SpaceTrashEntity } from "../Entity";

/**
 * Base class for all SpaceTrash entity components
 */
export abstract class SpaceTrashEntityComponent extends EntityComponent {
    public entity: SpaceTrashEntity;
    public components: Component[] = [];

    constructor() {
        super();
        this.entity = new SpaceTrashEntity();
    }
}

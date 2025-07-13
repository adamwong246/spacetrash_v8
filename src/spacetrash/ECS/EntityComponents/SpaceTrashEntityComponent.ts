import { EntityComponent } from "../../../../demiurge/ecs/EntityComponent";
import { SpaceTrashEntity } from "../../Entity";
import { Component } from "../../../../demiurge/ecs/Component";

/**
 * Base class for all SpaceTrash entity components
 */
export abstract class SpaceTrashEntityComponent extends EntityComponent {
    public entity: SpaceTrashEntity;
    public components: Component<any, any>[] = [];

    constructor() {
        super();
        this.entity = new SpaceTrashEntity();
    }
}

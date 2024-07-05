import { ISystems } from ".";
// import { ISpaceTrashSystems, SpaceTrashSystems } from "../Systems";

function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
  );
}

export class ECS<SystemKeys extends string> {

  entities: Entity[] = [];
  systems: Record<SystemKeys, System<SystemKeys>>;
  database: Database<SystemKeys>;

  constructor(systems: Record<SystemKeys, System<SystemKeys>>) {
    this.systems = systems;
    this.database = new Database();
  }

  addEntityComponent(entityComponent: EntityComponents) {
    this.database.addEntityComponent(entityComponent);
  }

  logicLoop() {
    (Object.entries(this.systems) as Array<[SystemKeys, System<SystemKeys>]>).forEach(([systemKey, system]) => {
      system.loop(this.database, systemKey)
    })
  }
}

export abstract class Entity {

}

export abstract class Component<IMove> {
  systems:  System<any>[];
  constructor(systems: System<any>[]) {
    this.systems = systems;
  }
  abstract getMove(): IMove
  abstract setMove(move: IMove)

}

export abstract class System<SystemKeys> {
  constructor() {

  }

  abstract doPreLogic(entitiesComponent: IEntitiesComponent): any
  abstract doLogic(prelogic)
  abstract doPostLogic(logic)

  loop(database: Database<SystemKeys>, system: SystemKeys) {
    setInterval((d, s) => this.logicLoop(d, s), 1000, database, system);
  }

  async logicLoop(database: Database<SystemKeys>, system: SystemKeys) {
    const entitiesComponent = database.getEntitiesComponent(system)
    const prelogic = await this.doPreLogic(entitiesComponent);
    const logic = await this.doLogic(prelogic);
    await this.doPostLogic(logic);
  }

}

export type IEntitiesComponent = [e: Entity, c: Component<unknown>][];

export class Database<SystemKey> {
  entities: Record<string, Entity> = {};
  components: Record<string, {
    component: Component<unknown>,
    entity_uid: string
  }> = {};

  constructor() {
  }

  addEntityComponent(entityComponent: EntityComponents) {
    const { entity, components } = entityComponent;
    const eid = this.addEntity(entity);
    this.addComponents(components, eid);
  }

  addEntity(entity: Entity) {
    const uuid = uuidv4();
    this.entities[uuid] = entity;
    return uuid;
  }

  addComponents(components: Component<unknown>[], entity_uid: string) {
    components.forEach((component) => {
      this.components[uuidv4()] = {
        component,
        entity_uid
      };
    })
  }

  getEntitiesComponent(system: SystemKey): IEntitiesComponent {
    return Object.values(this.components).filter((c) => {
      return c.component.systems.find((s) => s === system);
    }).map(({entity_uid, component}) => {
      return [this.entities[entity_uid], component]
    })
  }

}

export abstract class EntityComponents {
  entity: Entity
  components: Component<any>[];

  constructor(entity: Entity, components: Component<any>[]) {
    this.entity = entity;
    this.components = components;
  }
}
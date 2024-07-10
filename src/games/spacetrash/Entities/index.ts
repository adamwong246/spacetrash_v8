import { EntityComponent } from "../../../engine/ECS";
import { Entity } from "../../../engine/Entity";
import { InCastingComponent, AttackableComponent, ThermalComponent, CameraComponent } from "../Components/casting/in";
import { OutCastingComponent, MeleeComponent, GunComponent, LitComponent } from "../Components/casting/out";
import { UnmovingComponent, SpawningComponent, PanningComponent, WheeledComponent } from "../Components/conveyance";
import { PhysicsComponent, PhysicsSetComponent, PhysicsActorComponent } from "../Components/physics";
import { PoweredComponent, PowerConsumingComponent, PowerProducingComponent, PowerStoringComponent } from "../Components/power";

export  class SpaceTrashEntityComponent extends EntityComponent {
  constructor(
    entity: Entity,
    physics: PhysicsComponent,
    casts: (InCastingComponent | OutCastingComponent)[],
    ...components: (PoweredComponent)[]
  ) {
    super(entity, [physics, ...casts, ...components]);
  }
}

export class SpaceTrashEntity extends Entity {

  constructor() {
    super();
  }
}

export class Door extends SpaceTrashEntityComponent {
  constructor(x: number = 0, y: number = 0, r: number = 0) {
    super(
      new SpaceTrashEntity(),
      new PhysicsSetComponent(x, y, `south`),
      [
        new AttackableComponent(),
      ],
      new UnmovingComponent(),
      new PowerConsumingComponent(),
    );
  }
}

export class Slime extends SpaceTrashEntityComponent {
  constructor(x: number = 0, y: number = 0, r: number = 0) {
    super(
      new SpaceTrashEntity(),
      new PhysicsActorComponent(x, y, r, new SpawningComponent()),
      [
        new ThermalComponent(),
        new MeleeComponent(1),
      ],

    );
  }
}

export class BridgeConsole extends SpaceTrashEntityComponent {
  constructor(x: number = 0, y: number = 0, r: number = 0) {
    super(
      new SpaceTrashEntity(),
      new PhysicsSetComponent(x, y, 'south'),
      [
        new AttackableComponent(),
        new GunComponent(),
      ],
      new PowerConsumingComponent(),
      // new HackComponent(),
    );
  }
}

export class ReactorConsole extends SpaceTrashEntityComponent {
  constructor(x: number = 0, y: number = 0, r: number = 0) {
    super(
      new SpaceTrashEntity(),
      new PhysicsSetComponent(x, y, 'south'),
      [
        new AttackableComponent(),
      ],
      new PowerProducingComponent(),
      // new HackComponent(),
    );
  }
}

export class SecurityTurret extends SpaceTrashEntityComponent {
  constructor(x: number = 0, y: number = 0, r: number = 0) {
    super(
      new SpaceTrashEntity(),
      new PhysicsActorComponent(x, y, r, new PanningComponent()),
      [
        new AttackableComponent(),
        new GunComponent(),
      ],
      new PowerConsumingComponent(),
      // new HackComponent(),
    );
  }
}

export class Drone extends SpaceTrashEntityComponent {

  constructor(x: number = 0, y: number = 0, r: number = 0) {
    super(
      new SpaceTrashEntity(),
      new PhysicsActorComponent(x, y, r, new WheeledComponent()),
      [
        new LitComponent(),
        new CameraComponent(),
        new AttackableComponent(),
      ],
      new PowerStoringComponent(),
    );
  }
}
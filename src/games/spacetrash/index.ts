
import { StateSpace } from "../../engine/StateSpace";
import { Game } from "../../engine/Game";
// import { Scene } from "./engine/Scene";
import { Scene, View } from "../../engine/View";
import { ECS, Entity, EntityComponents, System } from "../../engine/ECS";

import { AttackableComponent, CameraComponent, InCastingComponent, ThermalComponent } from "./Components/casting/in";
import { ISpaceTrashSystems, SpaceTrashSystems } from "./Systems";
import { GunComponent, LitComponent, MeleeComponent, OutCastingComponent } from "./Components/casting/out";
import { PanningComponent, SpawningComponent, UnmovingComponent, WheeledComponent } from "./Components/conveyance";
import { PhysicsActorComponent, PhysicsComponent, PhysicsSetComponent } from "./Components/physics";
// import { SpaceTrashEntityComponent } from "./Component";
import { PowerConsumingComponent, PowerProducingComponent, PowerStoringComponent, PoweredComponent } from "./Components/power";
import { Hackable } from "./Systems/hackable";
// import { HackComponent } from "./Components/hackable";

const state = new StateSpace("stateSpace_v0", "boot", "goodbye");
state.connect(`boot`, `menu`);
state.connect(`menu`, `mainloop`);
state.connect(`mainloop`, `gameover`);
// state.connect(`gameover`, `menu`);
// state.connect(`mainloop`, `pause`);
// state.connect(`pause`, `mainloop`);
// state.connect(`mainloop`, `win`);
// state.connect(`win`, `menu`);
// state.connect(`menu`, `goodbye`);

const bootSceneView = new View('bootscene_view_v0', (ctx) => {
  ctx.font = "48px serif";
  ctx.fillText("Boot", 10, 50);
});

state.setView('boot', bootSceneView);

const menuSceneView = new Scene(
  'menuscene_view_v0',
  new Map<System<ISpaceTrashSystems>, (ctx: CanvasRenderingContext2D) => void>([
    [
      SpaceTrashSystems.gui,
      (ctx) => {
        ctx.font = "48px serif";
        ctx.fillText("Menu", 10, 50);
      }
    ],
  ])
);

state.setView('menu', menuSceneView);

const mainloopSceneView = new Scene(
  'mainloop_view_v0',
  new Map<System<ISpaceTrashSystems>, (ctx: CanvasRenderingContext2D) => void>([
  [
    SpaceTrashSystems.physical,
    (ctx) => {
      ctx.font = "48px serif";
      ctx.fillText("Physical", 10, 50);
    }
  ],
]));

state.setView('mainloop', mainloopSceneView);

// const gameoverSceneView = new Scene('gameover_view_v0', (ctx) => {
//   ctx.fillText("Gameover", 10, 50);
// });

// state.setView('gameover', gameoverSceneView);

export type IRays = 'light' | `sound` | `attack` | `movement` | `thermal`;

class SpaceTrashEntityComponent extends EntityComponents {
  constructor(
    entity: Entity,
    physics: PhysicsComponent,
    casts: (InCastingComponent | OutCastingComponent)[],
    ...components: (PoweredComponent )[]
  ) {
    super(entity, [physics, ...casts, ...components]);
  }
}

class SpaceTrashEntity extends Entity {

  constructor() {
    super();
  }
}

class Door extends SpaceTrashEntityComponent {
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

class Slime extends SpaceTrashEntityComponent {
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

class BridgeConsole extends SpaceTrashEntityComponent {
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

class ReactorConsole extends SpaceTrashEntityComponent {
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

class SecurityTurret extends SpaceTrashEntityComponent {
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

class Drone extends SpaceTrashEntityComponent {

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

export class Spacetrash extends Game<ISpaceTrashSystems> {
  constructor(
    canvasContext: CanvasRenderingContext2D
  ) {
    super(
      state,
      canvasContext,
      SpaceTrashSystems
    )
    const drone0 = new Drone();
    const drone1 = new Drone(1, 1, 1);
    const slime0 = new Slime(10, 10, 1);

    this.ecs.addEntityComponent(drone0);
    this.ecs.addEntityComponent(drone1);
    this.ecs.addEntityComponent(slime0);

  }
}
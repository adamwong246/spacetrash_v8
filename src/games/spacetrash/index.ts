import { System } from "../../engine/System";
import { StateSpace } from "../../engine/StateSpace";
import { Game } from "../../engine/Game";
import { View } from "../../engine/View";
import { EntityComponent } from "../../engine/ECS";

import { ISpaceTrashSystems, SpaceTrashSystems } from "./Systems";
import { Drone, Slime } from "./Entities";
import { PhysicsActorComponent } from "./Components/physics";

export type IRays =
  'light' |
  `sound` |
  'attack' |
  `movement` |
  `thermal` |
  'visible';

export enum ERays {
  'light',
  'sound',
  'attack',
  'movement',
  'thermal',
  'visible',
}

type IEvent = { type: "mouseup" };

const state = new StateSpace("stateSpace_v0", "boot", "goodbye");
state.connect(`boot`, `menu`);
state.connect(`menu`, `mainloop`);

state.set('boot', new View('bootscene_view_v0', [], (ecs, ctx, events: IEvent[]) => {
  events.forEach((event) => {
    if (event.type === "mouseup") {
      state.jump("menu");
    }
  })
  ctx.font = "32px sans-serif";
  ctx.fillText("click the mouse", 10, 50);
}));

state.set('menu', new View(
  'menuscene_view_v0',
  [],
  (ecs, ctx, events) => {

    events.forEach((event) => {
      if (event.type === "keydown") {
        state.jump("mainloop");
      }
    })

    ctx.font = "48px serif";
    ctx.strokeText("press any key", 10, 50);

  }
));

let mouseX = 0;
let mouseY = 0;

state.set('mainloop', new View(
  'mainloop_view_v0',
  [
    new Drone(),
    new Drone(1, 2, 3, 0.003, 0.002),
    new Slime(10, 10, 1, 0.001, 0.05),

    // ...([...new Array(50)].map((nil) => {
    //   return new Drone(
    //     Math.random() * 20 ,
    //     Math.random() * 20 ,
    //     Math.random() * (Math.random() - 1),
    //     (Math.random() - 0.5) / 10 ,
    //     (Math.random() - 0.5) / 10 ,
    //   );
    // }))
  ],
  (ecs, ctx, events) => {
    events.forEach((event) => {
      if (event.type === "mousemove") {
        mouseX = event.x;
        mouseY = event.y;
      }
    })

    ctx.beginPath();
    ctx.arc(mouseX, mouseY, 10, 0, 2 * Math.PI);
    ctx.fillStyle = "transparent";
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "blue";
    ctx.stroke();
    

    ecs.forEach((ec) => {
      const d = ec.components.find((c) => c.constructor.name === "PhysicsActorComponent") as PhysicsActorComponent;

      ctx.beginPath();
      ctx.arc(d.x * 10, d.y * 20, 4, 0, 2 * Math.PI);
      ctx.fillStyle = "black";
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "red";
      ctx.stroke();

    })

    // return (event) => {
    //   console.log(event);
    //   if (event.type === "mouseover") {
    //     this.mouse_x = event.x;
    //   }
    // };
  }

));

export class Spacetrash extends Game<ISpaceTrashSystems> {
  constructor() {
    super(
      state,
      SpaceTrashSystems
    )
  }

}
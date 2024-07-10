import { System } from "../../engine/System";
import { StateSpace } from "../../engine/StateSpace";
import { Game } from "../../engine/Game";
import { Scene, View } from "../../engine/View";
import { EntityComponent } from "../../engine/ECS";

import { ISpaceTrashSystems, SpaceTrashSystems } from "./Systems";
import { Drone, Slime } from "./Entities";

export type IRays = 'light' | `sound` | `attack` | `movement` | `thermal`;

const state = new StateSpace("stateSpace_v0", "boot", "goodbye");
state.connect(`boot`, `menu`);
state.connect(`menu`, `mainloop`);

state.set('boot', new View('bootscene_view_v0', [], (key, ctx) => {
  ctx.font = "32px sans-serif";
  ctx.fillText("Boot", 10, 50);
}));

state.set('menu', new View(
  'menuscene_view_v0',
  [],
  (key, ctx) => {
    ctx.font = "48px serif";
    ctx.strokeStyle = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    ctx.strokeText("Hello world", 10, 50);
  }
));

state.set('mainloop', new Scene(
  'mainloop_view_v0',
  [
    new Drone(),
    new Drone(1, 1, 1),
    new Slime(10, 10, 1),
  ],
  new Map<System<ISpaceTrashSystems>, (ctx: CanvasRenderingContext2D, ecs: EntityComponent[]) => void>([
    [
      SpaceTrashSystems.physical,
      (ctx, ecs: EntityComponent[]) => {
        // console.log("ecs", ecs);
        ctx.font = "48px serif";
        ctx.fillText(`Physical ${SpaceTrashSystems.physical.frame[0]}`, 10, 50);
        ecs.forEach(({entity, components}) => {
          components.forEach((c) => {
            // console.log(c);
          })
        })
      }
    ],
  ])));

export class Spacetrash extends Game<ISpaceTrashSystems> {
  constructor() {
    super(
      state,
      SpaceTrashSystems
    )
  }

}
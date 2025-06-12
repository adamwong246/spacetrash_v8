import { Game } from "../engine/Game";
import { Scene } from "../engine/Scene";
import { StateSpace } from "../engine/StateSpace";
import SpaceTrashPlayer from "./Player";
import {
  PhysicsActorComponent,
  PhysicsSetComponent,
} from "./Components/physics";
import { SpaceTrashTerminal } from "./lib/Terminal";
import { SpaceTrashDrone } from "./Entities";
import { ISpaceTrashApps } from "./UI";
import { SpaceTrashShip } from "./ship";
import { ActorSize, BotSlots, MapSize, NumberOfActors, SpaceTrashMainSystem, TileSize } from "./System";
import {
  AttackableComponent,
  CameraComponent,
  LitableComponent,
} from "./Components/casting/in";
import { PowerStoringComponent } from "./Components/power";
import { LitComponent } from "./Components/casting/out";
import { shipMapUpdateLoop } from "./shipMapUpdateLoop";
import { renderDrone } from "./renderDrone";
import { VideoComponent } from "./Components/video";
import { Phase0 } from "./Components/phase0";
// import SpaceTrashPlayer from "./Player";

let shipMapMouseX = 0;
let shipMapMouseY = 0;

export default class Spacetrash extends Game<any> {
  terminal: SpaceTrashTerminal;

  constructor(
    workerPostMessage: (
      message: any,
      options?: WindowPostMessageOptions | undefined
    ) => void
  ) {
    const ship = new SpaceTrashShip();
    const state = new StateSpace("stateSpace_v0", "boot", "goodbye");

    state.connect(`boot`, `menu`);
    state.connect(`menu`, `mainloop`);

    state.set(
      "boot",
      new Scene<ISpaceTrashApps>(
        "bootscene_view_v0",
        {
          terminal: [
            (ecs, reply) => {
              reply(this.terminal.boot());
            },
            (ecs, update) => {
              return [];
            },
            (ecs, events) => {},
            "2d",
          ],
          manual: [
            (ecs, reply) => {
              return [];
            },
            (ecs, reply) => {
              return [];
            },
            (ecs, events) => {},
            "2d",
          ],
          drone: [
            (ecs, reply) => {
              // return []
            },
            (ecs, reply) => {
              return [];
            },
            (ecs, events) => {},
            "webgl2",
          ],
          shipmap: [
            (ecs, reply) => {
              // return []
            },
            (ecs, reply) => {
              return [];
            },
            (ecs, events) => {},
            "2d",
          ],
        },
        async (ecs) => {
          return;
        }
      )
    );

    state.set(
      "menu",
      new Scene<ISpaceTrashApps>(
        "menuscene_view_v0",
        {
          terminal: [
            (ecs, reply) => {
              reply(["login", ""]);
              reply(["terminal-update", this.terminal.login()]);
              ecs.unpause()
            },
            (ecs, reply) => {
              return [];
            },
            (ecs, events) => {},
            "2d",
          ],
          manual: [
            (ecs, reply) => {
              // return []
            },
            (ecs, reply) => {
              return [];
            },
            (ecs, events) => {},
            "2d",
          ],

          drone: [
            // boot function
            (ecs, reply) => {
              return [(ctx) => {}];
            },

            // draw function
            (componentStores, reply) => {
              return [
                (ctx) => {
                  if (ctx.constructor.name === "WebGLRenderer") {
                    renderDrone(componentStores, ctx);
                  }
                },
              ];
            },
            (ecs, event: any) => {
              if (event === "1") {
                SpaceTrashPlayer.videoFeed = 1;
              }
              if (event === "2") {
                SpaceTrashPlayer.videoFeed = 2;
              }
              if (event.key === "ArrowUp") {
                SpaceTrashPlayer.yup();
              }
              if (event.key === "ArrowDown") {
                SpaceTrashPlayer.ydown();
              }
              if (event.key === "ArrowLeft") {
                SpaceTrashPlayer.xleft();
              }
              if (event.key === "ArrowRight") {
                SpaceTrashPlayer.xright();
              }
            },
            "webgl2",
          ],

          shipmap: [
            (ecs, reply) => {
              // return []
            },
            (componentStores, reply) => {
              const thingsToDraw: Record<string, any> = shipMapUpdateLoop(
                componentStores,
                reply
              );

              return [
                ...Object.keys(thingsToDraw).map((k) => {
                  return (c) =>
                    thingsToDraw[k].draw(c, thingsToDraw[k].opts) ||
                    ((c) => null);
                }),
                (canvas) => {
                  if (
                    canvas.constructor.name ===
                    "OffscreenCanvasRenderingContext2D"
                  ) {
                    const canvas2d =
                      canvas as OffscreenCanvasRenderingContext2D;
                    canvas2d.beginPath();
                    canvas2d.arc(
                      shipMapMouseX,
                      shipMapMouseY,
                      TileSize / 1,
                      0,
                      2 * Math.PI
                    );
                    canvas2d.lineWidth = 1;
                    canvas2d.strokeStyle = "green";
                    canvas2d.stroke();
                  }
                },
              ];
            },
            (ecs, event: any) => {
              if (event.type === "mousemove") {
                var rect = event.boundingClient;
                var x = event.clientX - rect.left;
                var y = event.clientY - rect.top;

                shipMapMouseX = x;
                shipMapMouseY = y;
              }
            },
            "2d",
          ],
        },
        (ecs) => {
          const drones = [...new Array(BotSlots)].map((n) => {
            return new SpaceTrashDrone(
              Math.random() * MapSize,
              Math.random() * MapSize,
              ActorSize,
              (Math.random() - 0.5) / 5,
              (Math.random() - 0.5) / 5
            );
          });
          SpaceTrashPlayer.setBots(drones);

          const moreBots = [...new Array(NumberOfActors - BotSlots)].map((n) => {
            return new SpaceTrashDrone(
              Math.random() * MapSize,
              Math.random() * MapSize,
              ActorSize,
              (Math.random() - 0.5) / 5,
              (Math.random() - 0.5) / 5
            );
          });

          return new Promise((res, rej) => {
            ecs.setEntitiesComponent([
              ship,
              ...ship.toTiles(),
              ...drones,
              ...moreBots
            ]);
            res();
          });
        }
      )
    );

    super(
      state,
      SpaceTrashMainSystem,
      new Set([
        AttackableComponent.name,
        CameraComponent.name,
        LitableComponent.name,
        LitComponent.name,
        PhysicsActorComponent.name,
        PhysicsSetComponent.name,
        PowerStoringComponent.name,
        VideoComponent.name,
        Phase0.name
      ]),
      workerPostMessage
    );
    this.terminal = new SpaceTrashTerminal();
    this.start();
  }

  async terminalIn(
    input: string,
    callback: (x: { out: string; status: string }) => void
  ): Promise<{ in: string; out: string }> {
    return {
      in: input,
      out: this.terminal.processCommand(input, this.changeScene, callback).out,
    };
  }
}

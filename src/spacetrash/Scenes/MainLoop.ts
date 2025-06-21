import { SpaceTrashScene } from ".";
import { SpaceTrash } from "..";
import { BotSlots } from "../Constants";

import { SpaceTrashShip } from "../ECS/EntityComponents/ship";
import { SpaceTrashBot } from "../ECS/EntityComponents/SpaceTrashBot";
import { MapSize, ActorSize, NumberOfActors, TileSize } from "../ECS/System";

const SPEED_CONSTANT = 0.01

class MainScene extends SpaceTrashScene {
  async boot(game: SpaceTrash) {
    const drones = [...new Array(BotSlots)].map((n) => {
      return new SpaceTrashBot(
        Math.random() * MapSize,
        Math.random() * MapSize,
        // TileSize * (MapSize / 2 ),
        // TileSize * (MapSize / 2 ),
        ActorSize,
        (Math.random() - 0.5) * SPEED_CONSTANT,
        (Math.random() - 0.5) * SPEED_CONSTANT
      );
    });

    const moreBots = [...new Array(NumberOfActors - BotSlots)].map((n) => {
      return new SpaceTrashBot(
        // 200, 200,
        Math.random() * MapSize,
        Math.random() * MapSize ,
        // Math.random() * MapSize,
        // Math.random() * MapSize,
        ActorSize,
        (Math.random() - 0.5) * SPEED_CONSTANT,
        (Math.random() - 0.5) * SPEED_CONSTANT
      );
    });

    const ship = new SpaceTrashShip();

    game.setEntitiesComponent([ship, ...ship.toTiles(), ...moreBots]);

    const myDoneIds = game.setEntitiesComponent([...drones]);

    game.bots = {
      1: [myDoneIds[0], "larry"],
      2: [myDoneIds[1], "curly"],
      3: [myDoneIds[2], "moe"],
      4: [myDoneIds[3], "kirk"],
      5: [myDoneIds[4], "spock"],
      6: [myDoneIds[5], "bones"],
      7: [myDoneIds[6], "han"],
      8: [myDoneIds[7], "luke"],
      9: [myDoneIds[8], "obiwan"],
    };

    game.openAllWindows();

    setTimeout(() => {
      game.unpause();
    }, 3000)
    
  }

  update(e: SpaceTrash) {
    throw new Error("Method not implemented.");
  }
  event(e: SpaceTrash) {
    throw new Error("Method not implemented.");
  }

  terminal(s: SpaceTrash) {
    // return s.renderTerminal;
  }
  drone(s: SpaceTrash, ctx: HTMLCanvasElement) {
    return s.renderDroneVideo(s, ctx);
  }
  shipMap() {
    throw new Error("Method not implemented.");
  }
  drones() {
    throw new Error("Method not implemented.");
  }
}

const scene = new MainScene({
  terminal: [
    (ecs, reply) => {
      // reply(["login", ""]);
      // reply(["terminal-update", this.terminal.login()]);
      // ecs.unpause();
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
    (ecs, reply) => {
      return [(ctx) => {}];
    },

    (ecs, reply) => {
      return [
        async (game, canvas) => {
          game.renderDroneVideo(canvas);
          // return false
        },
      ];
    },

    (ecs, event: any) => {
      // console.log(event);
      // if (event === "1") {
      //   this.videoFeed = 1;
      // }
      // if (event === "2") {
      //   this.videoFeed = 2;
      // }
      // if (event.key === "ArrowUp") {
      //   this.yup();
      // }
      // if (event.key === "ArrowDown") {
      //   this.ydown();
      // }
      // if (event.key === "ArrowLeft") {
      //   this.xleft();
      // }
      // if (event.key === "ArrowRight") {
      //   this.xright();
      // }
    },
    "webgl2",
  ],

  shipmap: [
    (ecs, reply) => {
      return [];
    },
    (ecs, reply) => {
      return [];
      // const thingsToDraw = [];  //shipMapUpdateLoop(ecs);

      // return [
      //   ...thingsToDraw,
      //   (canvas) => {
      //     if (
      //       canvas.constructor.name ===
      //       "OffscreenCanvasRenderingContext2D"
      //     ) {
      //       const canvas2d =
      //         canvas as OffscreenCanvasRenderingContext2D;
      //       canvas2d.beginPath();
      //       canvas2d.arc(
      //         shipMapMouseX,
      //         shipMapMouseY,
      //         TileSize / 1,
      //         0,
      //         2 * Math.PI
      //       );
      //       canvas2d.lineWidth = 1;
      //       canvas2d.strokeStyle = "green";
      //       canvas2d.stroke();
      //     }
      //   },
      // ];
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

  droneV2: [
    (ecs, reply) => {
      return [(ctx) => {}];
    },

    (ecs, reply) => {
      return [
        async (ctx) => {
          if (ctx.constructor.name === "WebGLRenderer") {
            // await renderDroneV2(ecs, ctx);
          }
        },
      ];
    },
    (ecs, event: any) => {
      if (event === "1") {
        this.videoFeed = 1;
      }
      if (event === "2") {
        this.videoFeed = 2;
      }
      if (event.key === "ArrowUp") {
        this.yup();
      }
      if (event.key === "ArrowDown") {
        this.ydown();
      }
      if (event.key === "ArrowLeft") {
        this.xleft();
      }
      if (event.key === "ArrowRight") {
        this.xright();
      }
    },
    "webgl2",
  ],

  shipmapV2: [
    (ecs, reply) => {
      return [];
    },
    (ecs, reply) => {
      return [
        async (game: SpaceTrash, ctx) => {
          await game.renderShipMap(ctx);
        },
      ];
    },
    (ecs, event: any) => {
      // if (event.type === "mousemove") {
      //   var rect = event.boundingClient;
      //   var x = event.clientX - rect.left;
      //   var y = event.clientY - rect.top;
      //   shipMapMouseX = x;
      //   shipMapMouseY = y;
      // }
    },
    "2d",
  ],

  drones: [
    (ecs, reply) => {
      // workerPostMessage([`drones-update`, 'hello']);
    },
    (ecs, reply) => {
      // workerPostMessage([`drones-update`, 'hello']);
      return [];
    },
    (ecs, events) => {
      // workerPostMessage([`drones-update`, 'hello']);
    },
    "html",
  ],
});

export default scene;

import { SpaceTrashScene } from ".";

import { MapSize } from "../Constants";
import { SpaceTrashBot } from "../ECS/EntityComponents/bots/TankBot.ts";
import { SpaceTrash } from "../Game/index.ts";
import level4 from "./../ECS/EntityComponents/ships/Ship4.ts"

class MainScene extends SpaceTrashScene {
  async boot(game: SpaceTrash) {
    // const ship = new BoringShip();
    const ship = new level4();
    // const ship = new level4();
    // const ship = new RotCellularShip();
    // const ship = new RotDiggerShip();

    const drones = [...new Array(1)].map((n) => {
      return new SpaceTrashBot(
        // Math.random() * MapSize * TileSize,
        // Math.random() * MapSize * TileSize,
        MapSize / 2,
        MapSize / 2,
        // 5, 5,
        0,
        0,
        0
        // 0.01, 0.01
        // (Math.random() - 0.5) * SPEED_CONSTANT,
        // (Math.random() - 0.5) * SPEED_CONSTANT
      );
    });

    // const radiationDetectingDrone = game.setEntitiesComponent([
    //   new SpaceTrashBot(
    //     Math.random() * MapSize * TileSize,
    //     Math.random() * MapSize * TileSize,
    //     0,
    //     0,
    //     0,
    //     "idk",
    //     [
    //       new RadiationDetectorComponent(0),
    //       new HeatDetectorComponent()
    //     ]
    //   ),
    // ])[0];

    // const moreBots = [...new Array(1)].map((n) => {
    //   return new PuckBot(
    //     // 200, 200,
    //     Math.random() * MapSize,
    //     Math.random() * MapSize ,
    //     // Math.random() * MapSize,
    //     // Math.random() * MapSize,
    //     ActorSize,
    //     (Math.random() - 0.5) * SPEED_CONSTANT,
    //     (Math.random() - 0.5) * SPEED_CONSTANT
    //   );
    // });

    // const moreBots = [...new Array(8)].map((n) => {
    //   return new PuckBot(
    //     Math.random() * MapSize,
    //     Math.random() * MapSize,
    //     ActorSize,
    //     0,
    //     0,
    //     String(performance.now()),
    //     new AiAgentComponent(
    //       "melee",
    //       "langdonsAnt",
    //       "suicideBomb",
    //       "acidCorpse",
    //       "heat",
    //       "sound",
    //       "fly",
    //       "vacuum",
    //       "explosive"
    //     )
    //   );
    // });

    // const monster1 = new PuckBot(
    //   Math.random() * MapSize,
    //   Math.random() * MapSize,
    //   ActorSize,
    //   (Math.random() - 0.5) * SPEED_CONSTANT,
    //   (Math.random() - 0.5) * SPEED_CONSTANT,
    //   String(performance.now()),
    //   new AiAgentComponent(
    //     "melee",
    //     "wallBounce",
    //     "suicideBomb",
    //     "acidCorpse",
    //     "heat",
    //     "sound",
    //     "fly",
    //     "vacuum",
    //     "explosive"
    //   )
    // );

    // const warpcore0 = new WarpCore(
    //   100,
    //   Math.round(Math.random() * MapSize),
    //   Math.round(Math.random() * MapSize)
    // );

    // const warpcore1 = new WarpCore(
    //   1000,
    //   Math.round(Math.random() * MapSize),
    //   Math.round(Math.random() * MapSize)
    // );

    game.setEntitiesComponent([
      ship,
      ...ship.toTiles(),
      // ...moreBots,
      // warpcore0,
      // warpcore1,
      // monster1,
    ]);

    const myDoneIds = game.setEntitiesComponent(drones);

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

    game.BeginTheGame();
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

  bot: [
    (ecs, reply) => {
      return [(ctx) => {}];
    },

    (ecs, reply) => {
      return [
        async (game: SpaceTrash) => {
          game.renderBotCanvas();
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

  map: [
    (ecs, reply) => {
      return [];
    },
    (ecs, reply) => {
      return [
        async (game: SpaceTrash) => {
          await game.renderShipMap();
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

  matter: [
    (ecs, reply) => {
      return [];
    },
    (ecs, reply) => {
      return [
        async (game: SpaceTrash) => {
          await game.renderMatterJs();
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

  arcadePhysics: [
    (ecs, reply) => {
      return [];
    },
    (ecs, reply) => {
      return [
        async (game: SpaceTrash) => {
          await game.renderArcadePhysics();
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

  thermal: [
    (ecs, reply) => {
      return [];
    },
    (ecs, reply) => {
      return [
        async (game: SpaceTrash) => {
          await game.renderThermals();
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

  samurai: [
    (ecs, reply) => {
      return [];
    },
    (ecs, reply) => {
      return [
        async (game: SpaceTrash) => {
          // await game.renderArcadePhysics();
        },
      ];
    },
    (ecs, event: any) => {
    },
    "2d",
  ],

});

export default scene;

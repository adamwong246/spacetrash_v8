import { SpaceTrash } from "..";

import { SpaceTrashScene } from ".";

class BootScene extends SpaceTrashScene {
  boot(e: SpaceTrash) {
    // debugger
  }


  update(e: SpaceTrash) {
    throw new Error("Method not implemented.");
  }
  event(e: SpaceTrash) {
    throw new Error("Method not implemented.");
  }
  drone(s: SpaceTrash) {
    return s.renderDroneVideo;
  }
  shipMap() {
    throw new Error("Method not implemented.");
  }
  drones() {
    throw new Error("Method not implemented.");
  }
}

export default new BootScene();

// (ecs) => {
//   const drones = [...new Array(BotSlots)].map((n) => {
//     return new SpaceTrashBot(
//       Math.random() * MapSize,
//       Math.random() * MapSize,
//       ActorSize,
//       (Math.random() - 0.5) / 5,
//       (Math.random() - 0.5) / 5
//     );
//   });

//   const moreBots = [...new Array(NumberOfActors - BotSlots)].map((n) => {
//     return new SpaceTrashBot(
//       Math.random() * MapSize,
//       Math.random() * MapSize,
//       ActorSize,
//       (Math.random() - 0.5) / 5,
//       (Math.random() - 0.5) / 5
//     );
//   });

//   const ship = new RotDiggerShip();

//   ecs.setEntitiesComponent([
//     ship,
//     ...ship.toTiles(),
//     // ...drones,
//     ...moreBots,
//   ]);

//   const myDoneIds = ecs.setEntitiesComponent([...drones]);

//   e.bots = {
//     1: [myDoneIds[0], "larry"],
//     2: [myDoneIds[1], "curly"],
//     3: [myDoneIds[2], "moe"],
//     4: [myDoneIds[3], "kirk"],
//     5: [myDoneIds[4], "spock"],
//     6: [myDoneIds[5], "bones"],
//     7: [myDoneIds[6], "han"],
//     8: [myDoneIds[7], "luke"],
//     9: [myDoneIds[8], "obiwan"],
//   };

//   // this.updateUI()

//   // return new Promise((res, rej) => {
//   //   res();
//   // });
// };

//   "bootscene_view_v0",
//   {
//     terminal: [
//       (ecs, reply) => {
//         // reply(this.terminal.boot());
//       },fpr
//         return [];
//       },
//       (ecs, events) => {},
//       "2d",
//     ],
//     manual: [
//       (ecs, reply) => {
//         return [];
//       },
//       (ecs, reply) => {
//         return [];
//       },
//       (ecs, events) => {},
//       "2d",
//     ],
//     drone: [
//       (ecs, reply) => {
//         // return []
//       },
//       (ecs, reply) => {
//         return [];
//       },
//       (ecs, events) => {},
//       "webgl2",
//     ],
//     shipmap: [
//       (ecs, reply) => {
//         return [];
//       },
//       (ecs, reply) => {
//         return [];
//       },
//       (ecs, events) => {},
//       "2d",
//     ],
//     drones: [
//       (ecs, reply) => {
//         return [];
//       },
//       (ecs, reply) => {
//         return [];
//       },
//       (ecs, events) => {
//         return [];
//       },
//       "html",
//     ],
//     shipmapV2: [
//       (ecs, reply) => {
//         return [];
//       },
//       (ecs, reply) => {
//         return [];
//       },
//       (ecs, events) => {},
//       "2d",
//     ],
//     droneV2: [
//       (ecs, reply) => {
//         return [];
//       },
//       (ecs, reply) => {
//         return [];
//       },
//       (ecs, events) => {
//         return [];
//       },
//       "html",
//     ],
//   },
//   async (ecs) => {
//     return;
//   }

// import bootScene from "../Scenes/Boot";
// import mainLoopScene from "../Scenes/MainLoop";
// import { StateSpace } from "../../engine/game/StateSpace";

// import { GameWithControls } from "./4-WithControls";

// export abstract class GameWithStateSpace extends GameWithControls {
//   stateSpace: StateSpace;

//   constructor(domNode: HTMLElement) {
//     super(domNode, {
//       performanceLogging: false,
//       fps: 60,
//       headless: false
//     }, new Set(["2d", "webgl2", "pixi2d", "threejs", "arcadePhysics"]));

//     this.stateSpace = new StateSpace("stateSpace_v0", "boot", "goodbye");
//     this.stateSpace.connect(`boot`, `mainloop`);
//     this.stateSpace.connect(`mainloop`, `goodbye`);
//     this.stateSpace.set("boot", bootScene);
//     this.stateSpace.set("mainloop", mainLoopScene);
//   }

  

// }


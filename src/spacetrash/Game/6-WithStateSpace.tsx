import bootScene from "../Scenes/Boot";
import mainLoopScene from "../Scenes/MainLoop";
import { StateSpace } from "../../engine/game/StateSpace";
import { GameWithRenders } from "./5-WithRenders";
import { IBotWindowState } from "../UI/BotWindow";

export abstract class GameWithStateSpace extends GameWithRenders {

  

  stateSpace: StateSpace;

  constructor(domNode: HTMLElement) {
    super(domNode, {
      performanceLogging: false,
      fps: 60,
      headless: false
    });

    this.stateSpace = new StateSpace("stateSpace_v0", "boot", "goodbye");
    this.stateSpace.connect(`boot`, `mainloop`);
    this.stateSpace.connect(`mainloop`, `goodbye`);
    this.stateSpace.set("boot", bootScene);
    this.stateSpace.set("mainloop", mainLoopScene);
  }

  loginHook() {
    this.changeScene("mainloop")
  }

  registerBotsHook(stateSetter: React.Dispatch<any>) {
    this.botsHook = stateSetter;
    this.botsHook(this.bots)
  }

  registerBotHook(stateSetter: React.Dispatch<React.SetStateAction<IBotWindowState>>) {
    this.botHook = stateSetter;
  }

}


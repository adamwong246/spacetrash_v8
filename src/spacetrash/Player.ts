import { PhysicsActorComponent } from "./Components/physics";
import { SpaceTrashDrone } from "./Entities";

class SpaceTrashPlayer {
  videoFeed: number = 1;
  bots: {
    1: PhysicsActorComponent,
    2: PhysicsActorComponent,
    3: PhysicsActorComponent,
    4: PhysicsActorComponent,
    5: PhysicsActorComponent,
    6: PhysicsActorComponent,
    7: PhysicsActorComponent,
    8: PhysicsActorComponent,
    9: PhysicsActorComponent
  };

  setBots(bots: SpaceTrashDrone[]) {
    this.bots = {
      1: bots[0].physicsActorComponent,
      2: bots[1].physicsActorComponent,
      3: bots[2].physicsActorComponent,
      4: bots[3].physicsActorComponent,
      5: bots[4].physicsActorComponent,
      6: bots[5].physicsActorComponent,
      7: bots[6].physicsActorComponent,
      8: bots[7].physicsActorComponent,
      9: bots[8].physicsActorComponent,
    }
  }


  yup() {
    for (let ndx = 1; ndx <= 9; ndx++) {
      if (this.videoFeed === ndx) {
        this.bots[this.videoFeed].dy = this.bots[this.videoFeed].dy - 0.001
      }
    }
  }
  ydown() {
    for (let ndx = 1; ndx <= 9; ndx++) {
      if (this.videoFeed === ndx) {
        this.bots[this.videoFeed].dy = this.bots[this.videoFeed].dy + 0.001
      }
    }
  }

  xleft() {
    
    for (let ndx = 1; ndx <= 9; ndx++) {
      if (this.videoFeed === ndx) {
        this.bots[this.videoFeed].dx = this.bots[this.videoFeed].dx - 0.001
      }
    }
  }
  xright() {
    for (let ndx = 1; ndx <= 9; ndx++) {
      if (this.videoFeed === ndx) {
        this.bots[this.videoFeed].dx = this.bots[this.videoFeed].dx + 0.001
      }
    }
  }
}

export default new SpaceTrashPlayer();

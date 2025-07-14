import { SpaceTrashScene } from ".";
import { SpaceTrash } from "../Game/9-WithTiled";

class BootScene extends SpaceTrashScene {
  boot(e: SpaceTrash) {
    // no-op
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

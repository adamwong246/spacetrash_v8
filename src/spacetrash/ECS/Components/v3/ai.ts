import { AM } from "../../../../demiurge/ai/ai";
import { Component } from "../../../../demiurge/ecs/Component";
import { SP_MapStore } from "../../../../demiurge/ecs/SP_MapStore";

import { SpaceTrash } from "../../../Game/9-WithTiled";
import { SpaceTrashEntity } from "../../Entity";

// Environment simulation
function simulateEnvironment() {
  // Generate random environment events
  const events = [
    "User entered the room",
    "System temperature rising",
    "New message received",
    "Resource limit reached",
  ];
  const randomEvent = events[Math.floor(Math.random() * events.length)];
  return randomEvent;
}

export class AiAgentComponent extends Component {
  // AiAgentComponent is unique in storing the entity id
  // entityId: number = -1;

  mind: AM;

  entity: SpaceTrashEntity;

  constructor(entity: SpaceTrashEntity) {
    super();
    this.entity = entity;
  }

  // TODO- this is run on each AiAgent on game load
  load(eid: number) {
    this.mind = new AM("safe", eid);
    // this.entityId = eid;
  }

  tick(game: SpaceTrash, delta: number) {
    this.mind.act(game, delta);
    // this.mind.tick();
    // // Force emotion system update every tick
    // this.mind._emotionSystem.update();
    // const envData = simulateEnvironment();
    // this.mind.processInput(envData);
    // this.mind.evaluateDrives();
    // this.mind.evaluateGoals();
  }
}

export class AiAgentStore extends SP_MapStore<AiAgentComponent> {}

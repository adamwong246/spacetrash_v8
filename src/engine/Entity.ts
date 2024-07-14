import { uuidv4 } from "./lib";

export abstract class Entity {
  uuid: string;

  constructor() {
    this.uuid = uuidv4();
  }
}
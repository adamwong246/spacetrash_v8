import { Entity } from "./Entity";
import { System } from "./System";
import { uuidv4 } from "./lib";

export default abstract class Component<IMove, IComponents> {
  // uuid: string;
  entityUid: string;
  systemsUids: string[];
  
  constructor(
    entityUid: string,
    systemsUids: string[],
    
  ) {
    this.entityUid = entityUid;
    this.systemsUids = systemsUids;
    // this.uuid = uuidv4();
  }

}

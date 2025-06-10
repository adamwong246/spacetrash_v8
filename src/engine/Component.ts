export default abstract class Component<IMove, IComponents> {

  entityUid: string;

  constructor(
    entityUid: string,
    
  ) {
    this.entityUid = entityUid;
  }

}

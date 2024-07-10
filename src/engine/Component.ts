import { System } from "./System";

// function uuidv4() {
//   return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
//     (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
//   );
// }

export default abstract class Component<IMove, IComponents> {
  // type: IComponents;
  systems: System<any>[];
  // runType: string;
  payload: object;
  
  constructor(
    systems: System<any>[],
    // runType: string
  ) {
    this.systems = systems;
    // this.runType = runType;
  }

  abstract getMove(): IMove
  abstract setMove(move: IMove)

}

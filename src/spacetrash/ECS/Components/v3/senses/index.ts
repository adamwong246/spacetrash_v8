import { FovSense } from "./fov";

export abstract class Sense {
  abstract memory;

  abstract inputSensoryData(...a)
}


// export default {
//   fov: new FovSense()
// }
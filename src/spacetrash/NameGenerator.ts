

import { SpaceTrashEntity } from "./ECS/Entity"
import MaleNames from "./MaleNames.json"


export default {
  generate: (gender: 'male' | 'female', spe: SpaceTrashEntity) => {
    return MaleNames[spe.eid]
  }
}
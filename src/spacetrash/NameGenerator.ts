// import MaleNames from '@stdlib/datasets-male-first-names-en';
// import femaleNames from '@stdlib/datasets-female-first-names-en';
import { SpaceTrashEntity } from './Entities';

// var malenames = require( '@stdlib/datasets-male-first-names-en' );


// console.log(maleNamesSorted)

import MaleNames from "./MaleNames.json"

// const maleNamesSorted = MaleNames()
//   .filter((m) => !maleNamesBlacklist.includes(m))
//   .sort((a, b) => a.length - b.length)
// console.log(maleNamesSorted)

export default {
  generate: (gender: 'male' | 'female', spe: SpaceTrashEntity) => {
    return MaleNames[spe.eid]
  }
}
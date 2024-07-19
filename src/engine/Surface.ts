export abstract class Surface {

  key: string;
  store: Uint16Array;

  constructor(key: string) {
    this.key = key;
    // console.log("creating surface", key);
    this.store = new Uint16Array(65535);
  }

  get(ndx: number) {
    this.store[ndx];
  }

  set(i: number, arg1: any) {
    this.store[i] = arg1;
  }

  getCordintal(x: number, y: number) {
    return this.store[y * 256 + x];
  }
}

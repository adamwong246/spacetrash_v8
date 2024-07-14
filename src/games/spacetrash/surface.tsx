import { Surface } from "../../engine/Surface";

let getRandomBytes = (
  (typeof self !== 'undefined' && (self.crypto ))
    ? function() { // Browsers
        var crypto = (self.crypto ), QUOTA = 65536;
        return function(n) {
          var a = new Uint8Array(n);
          for (var i = 0; i < n; i += QUOTA) {
            self.crypto.getRandomValues(a.subarray(i, i + Math.min(n - i, QUOTA)));
          }
          return a;
        };
      }
    : function() { // Node
        return require("crypto").randomBytes;
      }
)();

export class SpaceTrashSurface extends Surface{
  constructor(key: string) {
    super(key);

    // self.crypto.getRandomValues(this.store);
    for (let i = 0; i < 65535; i++){
      // console.log(getRandomBytes())
      this.set(i, Math.random() * 65535)
    }
  }
  
  // key: string;
  // store: Uint16Array;

  // constructor(key: string) {
  //   this.key = key;
  //   console.log("creating surface", key);
  //   this.store = new Uint16Array(65535);
  // }

  // get(ndx: number) {
  //   this.store[ndx];
  // }
}

import Component from "../engine/Component";

export function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
  );
}

// export function make<T>(c: Component<any, any>, arg1: string): T | null {
//   if (c.constructor.name === arg1) {
//     return c as T;
//   }
//   return null;
// }

// export function makes<T>(cs: Component<any, any>[], arg1: string): T[] {
//   return cs.filter((c) => {
//     return c.constructor.name === arg1
//   }) as T[];
// }
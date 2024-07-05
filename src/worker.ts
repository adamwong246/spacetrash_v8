import { Spacetrash } from "./games/spacetrash";

let sp: Spacetrash;

self.onmessage = function handleMessageFromMain(msg) {
  console.log("message from main received in worker:", msg.data);

  if (msg.data[0] === 'canvas') {
    sp = new Spacetrash(msg.data[1].getContext("2d"))
      .start();
  }
  if (msg.data[0] === 'inputEvent') {
    if (sp) {
      sp.inputEvent(msg.data[1])  
    } 
  }
};

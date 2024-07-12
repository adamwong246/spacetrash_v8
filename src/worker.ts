import { Spacetrash } from "./games/spacetrash";

const sp = new Spacetrash().start();

self.onmessage = function handleMessageFromMain(msg) {
  // console.log("message from main received in worker:", msg.data);

  if (msg.data[0] === 'canvas') {
    sp.registerCanvas('alpha', true, msg.data[1].getContext("2d"))
  }
  if (msg.data[0] === 'inputEvent') {
    if (sp) {
      sp.state.inputEvent(msg.data[1])  
    } 
  }
  if (msg.data[0] === '2nd-canvas') {
    sp.registerCanvas('beta', true, msg.data[1].getContext("2d"));
  }
};

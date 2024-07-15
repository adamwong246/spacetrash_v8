import { ESpaceTrashApps } from "./UI";
import Spacetrash from "./spacetrash";

const beta = new Worker("./beta.js");

console.log("hello alpha");

const sp = new Spacetrash(postMessage).start();

self.onmessage = function handleMessageFromMain(msg: MessageEvent) {
  
  // console.log("message from main received in worker:", msg.data);

  if (msg.data[0] === 'inputEvent') {
    if (sp) {
      sp.state.inputEvent(msg.data[1], msg.data[2])  

      // beta.postMessage(msg.data)
    } 
  } else {
    

    if (msg.data[0] === 'terminal-in') {
      
      sp.terminalIn(msg.data[1], (output) => {
        postMessage([`terminal-update`, output]);
      }).then((output) => {
        postMessage([`terminal-update`, output]);
      });
    }

    Object.keys(ESpaceTrashApps).forEach(spApp => {
      if (msg.data[0] === `${spApp}-register`) {
        if (msg.data.length === 1) {
          sp.register(
            spApp,
            true,
            undefined,
            (data) => {
              postMessage([`${spApp}-update`, data]);
            }
          )
        } 
        else {
          sp.register(
            spApp,
            true,
            msg.data[1].getContext("2d", { alpha: false }),
            (data) => {
              postMessage([`${spApp}-update`, data]);
            }
          )
        }
        
      }  
    });  
  }

};

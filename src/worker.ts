import { ESpaceTrashApps } from "./spacetrash/UI";
import Spacetrash from "./spacetrash/index";

const sp = new Spacetrash(postMessage)

self.onmessage = function handleMessageFromMain(msg: MessageEvent) {
  
  // console.log("message from main received in worker:", msg.data);

  if (msg.data[0] === 'inputEvent') {
    if (sp) {
      sp.inputEvent(msg.data[1], msg.data[2])
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
        // for apps without a canvas
        if (msg.data.length === 1) {
          sp.register(
            spApp,
            true,
            undefined,
            (data) => {
              postMessage([`${spApp}-update`, data]);
            },
            undefined
          )
        } 
        // for apps with a canvas
        else {
          sp.register(
            spApp,
            true,
            // msg.data[1].getContext("2d", { alpha: false }),
            msg.data[1],
            (data) => {
              postMessage([`${spApp}-update`, data]);
            },
            msg.data[2],
          )
        }
        
      }  
    });  
  }

};

// sp.register(
//   `register-terminal`,
//   true,
//   undefined,
//   (data) => {
//     postMessage([`terminal-update`, data]);
//   }
// )

sp.start();
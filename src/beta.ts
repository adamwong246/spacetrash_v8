console.log("hello beta");

// if (crossOriginIsolated) {
//   const buffer = new SharedArrayBuffer(16);
//   myWorker.postMessage(buffer);
// } else {
//   const buffer = new ArrayBuffer(16);
//   myWorker.postMessage(buffer);
// }

self.onmessage = function handleMessageFromMain(msg: MessageEvent) {
  console.log("beta", msg )
  

};

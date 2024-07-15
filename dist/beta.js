// src/beta.ts
console.log("hello beta");
self.onmessage = function handleMessageFromMain(msg) {
  console.log("beta", msg);
};

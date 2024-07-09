// src/apps/drones/index.tsx
console.log("hello drones");
var drones_default = (osjs) => {
  osjs.register("drones", (core, args, options, metadata) => {
    const proc = core.make("osjs/application", { args, options, metadata });
    return proc;
  });
};
export {
  drones_default as default
};

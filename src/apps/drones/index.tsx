// src/apps/drones/index.tsx
console.log("hello drones");

export default (osjs) => {
  osjs.register('drones', (core, args, options, metadata) => {
    const proc = core.make('osjs/application', {args, options, metadata});
  
    // Create your windows etc here
  
    return proc;
  });
}

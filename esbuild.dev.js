import esbuild from 'esbuild';
import esbuildConfig from "./esbuid.js";

esbuild.context(esbuildConfig).then((ctx) => {
  ctx.serve({
    cors: {
      origin: 'https://localhost',
    },
  });
})
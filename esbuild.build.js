// esbuild --bundle --format=esm --loader:.html=copy --outdir=dist src/index.tsx src/index.html src/worker.ts
// esbuild --serve --bundle --format=esm --loader:.html=copy --outdir=dist src/index.tsx src/index.html src/worker.ts

esbuild = require('esbuild');


esbuild.build({
  // serve: true,
  bundle: true,
  format: "esm",
  entryPoints: ['./src/index.ts'],
  bundle: true,
  // platform: 'node',
  outfile: 'dist/index.js',
  sourcemap: true,
  target: 'node12',
  // external: Object.keys(require('../package.json').dependencies),

  loader: {
    '.css': 'text',
    '.html': 'copy',
  },

})
import esbuild from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin'

esbuild.context({
  bundle: true,
  // outbase: 'src',
  format: "esm",
  entryPoints: [
    './src/index.tsx',
    './src/index.html',
    './src/worker.ts',
    './src/index.scss',
    // './node_modules/react-drag-resize-dock-modal/dist/index.css'
    './src/experiments/gamespace/index.html',
    './src/experiments/gamespace/index.tsx',
  ],

  outdir: "./dist",

  external: ["crypto"],
  loader: {
    '.css': 'file',
    '.html': 'copy',
    '.png': `copy`,
    '.json': `file`,
    '.mp3': `copy`,
  },
  "assetNames": "[name]",
  
  plugins: [
    sassPlugin({cssImports: true}),
  ],

}).then((ctx) => {
  ctx.serve();
})
import esbuild from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin'

esbuild.context({
  bundle: true,
  // outbase: 'src',
  format: "esm",
  entryPoints: [
    './src/index.tsx',
    './src/index.html',
    './src/index.scss',

    './src/alpha.ts',
    './src/beta.ts',
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
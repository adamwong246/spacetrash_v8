import { sassPlugin } from 'esbuild-sass-plugin'
import { wasmLoader } from 'esbuild-plugin-wasm'

export default {
  keepNames: true,
  bundle: true,
  format: "esm",
  entryPoints: [
    './src/index.tsx',
    './src/index.html',
    './src/index.scss',
  ],

  outdir: "./dist",
  target: ['esnext'],
  external: ["crypto"],
  loader: {
    '.css': 'file',
    '.html': 'copy',
    '.png': `file`,
    '.json': `json`,
    '.mp3': `copy`,
    '.obj': `file`,
    '.mtl': `file`,
  },
  "assetNames": "[name]",

  plugins: [
    sassPlugin({ cssImports: true }),
    wasmLoader(),


  ],

}
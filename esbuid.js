import fs from "fs";

import { sassPlugin } from 'esbuild-sass-plugin'
import ImportGlob from 'esbuild-plugin-import-glob';
const ImportGlobPlugin = ImportGlob.default

import xml2js from "xml2js";

// const myTsxLoaderPlugin = {
//   name: 'my-tsx-loader',
//   setup(build) {
//     // Intercept .tsx files
//     build.onLoad({ filter: /\.tsx$/ }, async (args) => {
//       // Check if the file is in your Tiled editor directory
//       if (args.path.startsWith('/path/to/your/tiled/files')) { // Adjust path as needed
//         // Load as text (or whatever you need to do with the Tiled data)
//         const contents = await fs.promises.readFile(args.path, 'utf8');
//         return {
//           contents,
//           loader: 'text', // Or another appropriate loader
//         };
//       } else {
//         // Let esbuild handle other .tsx files (e.g., as React TSX)
//         return null; //  Return null to let other loaders handle it
//       }
//     });
//   },
// };


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
    '.jpg': 'file',
    '.json': `json`,
    '.mp3': `copy`,
    '.mtl': `file`,
    '.obj': `file`,
    '.png': `file`,
    '.tsj': 'json',
    '.tmj': 'json',
    '.tj': 'json',
  },
  "assetNames": "[name]",

  plugins: [
    sassPlugin({ cssImports: true }),
    ImportGlobPlugin(),

    {
      name: 'tsx-interceptor',
      setup(build) {
        // Intercept .tsx files
        build.onLoad({ filter: /\.tsx$/ }, async (args) => {
          // Check if the file is in your Tiled editor directory
          if (args.path.startsWith('./src/spacetrash/tiled')) { // Adjust path as needed
            // Load as text (or whatever you need to do with the Tiled data)
            const contents = await fs.promises.readFile(args.path, 'utf8');
            return {
              contents,
              loader: 'text', // Or another appropriate loader
            };
          } else {
            // Let esbuild handle other .tsx files (e.g., as React TSX)
            return null; //  Return null to let other loaders handle it
          }
        });
      },
    },


    {
    name: 'tx-parser',
    setup(build) {
      // Define a filter to match .xml files
      build.onLoad({ filter: /\.tx$/ }, async (args) => {
        try {
          // Read the XML file content
          const xml = await fs.readFileSync(args.path, 'utf8');

          // Parse the XML using xml2js
          const parser = new xml2js.Parser();
          const result = await parser.parseStringPromise(xml);

          // Convert the parsed result to a JSON string
          const json = JSON.stringify(result, null, 2);

          // Return the JSON as a JavaScript module
          return {
            contents: `export default ${json};`,
            loader: 'js',
          };
        } catch (error) {
          return {
            errors: [{ text: error.message }],
          };
        }
      });
    },
    },
  
    {
      name: 'tmj-parser',
      setup(build) {
        // Intercept import paths called "env" so esbuild doesn't attempt
        // to map them to a file system location. Tag them with the "env-ns"
        // namespace to reserve them for this plugin.
        build.onResolve({ filter: /^.tmj$/ }, args => ({
          path: args.path,
          namespace: 'tiled-ns',
        }))

        // Load paths tagged with the "env-ns" namespace and behave as if
        // they point to a JSON file containing the environment variables.
        build.onLoad({ filter: /.*/, namespace: 'tiled-ns' }, () => ({
          contents: JSON.stringify(process.env),
          loader: 'json',
        }))
      },
    }

  ],

}
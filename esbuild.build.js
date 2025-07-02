import fs from "fs";
import esbuild from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin'
import { wasmLoader } from 'esbuild-plugin-wasm'

import esbuildConfig from "./esbuid.js";

esbuild.build(esbuildConfig)
import fs from 'node:fs/promises';
import path from 'node:path';
import { URL } from 'node:url';
import esbuild from 'esbuild'

const __dirname = new URL('.', import.meta.url).pathname;
export const srcPath = path.resolve(__dirname, '../src');
export const buildPath = path.resolve(__dirname, '../build');

const entryPoints = [
  'background.js',
  'content.js',
  'options.js'
].map((filename) => path.resolve(srcPath, filename))

export const esbuildConfig = {
  entryPoints,
  bundle: true,
  outdir: buildPath
}

export async function cleanup () {
  await fs.rm(buildPath, { recursive: true, force: true });
  return fs.mkdir(buildPath, { recursive: true });
}

export async function copySrcToBuild (filename) {
  return fs.copyFile(
    path.resolve(srcPath, filename),
    path.resolve(buildPath, filename)
  )
}

export async function copyResources () {
  const srcContent = await fs.readdir(srcPath, { withFileTypes: true });
  const filesToCopy = srcContent
    .filter((item) => item.isFile() && !item.name.match(/\.js$/i))
    .map((item) => item.name);
  return Promise.all(filesToCopy.map(copySrcToBuild));
}

export async function compile () {
  return esbuild.build(esbuildConfig)
}

export async function build (devMode = false) {
  try {
    await cleanup();
    await copyResources();
    await compile()
    console.log('build successful')
  } catch (error) {
    if (!devMode) {
      process.exit(1);
    }
  }
}

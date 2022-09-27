import chokidar from 'chokidar';
import { build, srcPath } from './utilities.js';

await build(true)

async function handleChange (path) {
  console.log('changed file', path)
  return build(true)
}

chokidar.watch(srcPath, {
  persistent: true,
  ignoreInitial: true
})
  .on('add', handleChange)
  .on('change', handleChange)
  .on('unlink', handleChange)

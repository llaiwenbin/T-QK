const path = require('path');
const { name } = require('./package');

function resolve(dir) {
  return path.join(__dirname, dir);
}

const port = 7771; // dev port

module.exports = {
  host: '127.0.0.1',
  port,
  hot: true,
  outputDir: 'dist',
  assetsDir: 'static',
  cors: {
    origin: '*'
  },
  rollupInputOptions: {
    input: 'src/main.js',
    preserveEntrySignatures: true
  },
  rollupOutputOptions: {
    output: {
      dir: 'dist',
      assetFileNames: '_assets/[name].[hash][extname]',
      entryFileNames: '_assets/[name].[hash].js',
      format: 'umd',
      name: 'vue-aaa'
    }
  }
};
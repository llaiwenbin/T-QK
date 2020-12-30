// import cors from '@koa/cors'
var cors = require('@koa/cors')
// const path = require('path');
// const { name } = require('./package');

// function resolve(dir) {
//   return path.join(__dirname, dir);
// }

const port = 7771; // dev port

module.exports = {
  host: '127.0.0.1',
  port,
  hot: true,
  outputDir: 'dist',
  assetsDir: 'static',
  // cors: {
  //   origin: '*'
  // },
  configureServer: ({ app }) => {
    // The server is only used in dev - not in prod,
    // so allowing any origin is safe.
    app.use(cors({ origin: '*' }));
  },
  rollupInputOptions: {
    // Make sure that rollup captures the exports from your main.js,
    // so that single-spa can find them
    input: 'src/main.js',
    preserveEntrySignatures: true,
  },
  rollupOutputOptions: {
    // Compile the bundle to System.register format, for production usage
    format: 'system',
  },
  // Pending https://github.com/vuejs/vue-next/pull/2477,
  // vue template assets will correctly resolve even when you are
  // using import map overrides
  // vueTransformAssetUrls: {
  //   base: 'http://localhost:3000/src/'
  // }
};
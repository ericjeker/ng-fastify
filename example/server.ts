import 'zone.js/dist/zone-node';

import Fastify, { FastifyInstance } from 'fastify';
import { join } from 'path';
import { AppServerModule } from './src/app/app.server.module';
import { existsSync } from 'fs';
import { ngFastifyEngine } from 'ng-fastify';

const distFolder = join(process.cwd(), 'dist/example');
const filePath = existsSync(join(distFolder, 'index.html')) ? join(distFolder, 'index.html') : 'index.html';

export function app(): FastifyInstance {
  const server: FastifyInstance = Fastify();

  // Serve static files from /browser, this is mandatory as Angular will request the different JS and CSS
  // files in dist/**/browser when transitioning back from the server-rendered app.
  server.register(require('fastify-static'), {
    root: distFolder,
    maxAge: '1y',
    // this is important otherwise '/' route will load index.html
    index: false,
    // this is so that fastiy-static only treat files
    wildcard: false,
    // preCompressed: true
  });

  // Register the Fastify Engine, this is factory returning a Fastify Plugin
  server.register(ngFastifyEngine({
    bootstrap: AppServerModule,
    filePath
  }));

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Node Fastify Server listening at ${address}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';

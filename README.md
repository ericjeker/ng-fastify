# ng-fastify

Fastify Engine for running Angular Universal

## Description

ng-fastify create a `CommonEngine` with the setup options passed to the `ngFastifyEngine`.

It then creates a Fastify Plugin that you must register calling `fastify.register` (see the example).

The plugin [decorates](https://www.fastify.io/docs/latest/Decorators/) the reply 
with a function called `view`. This function call the `render` method of the `CommonEngine`
previously initialized and return its value.

The plugin also creates a route on `/*`, intercepting all GET requests to the server. 
This interceptor then simply set the `content-type` of the reply to `text/html` and call
the `view` decorator.

The value returned by the engine is sent back to the client as the body of the response.

## Installation and Example

In `/example` you will a standard Angular application generate by `ng new` on which
we have added SSR render using `ng-fastify`.

The changes made are as following :

```shell
npm i --save ng-fastify @angular/platform-server @nguniversal/builders fastify fastify-static
```

- Create `server.ts`
- Create `src/main.server.ts`
- Create `src/app/app.server.module.ts`
- Create `tsconfig.server.json`


- Change `app.module.ts` to add server transition and appId
- Change `angular.json` - Added `server`, `serve`, and `prerender` architects 
- Change `package.json` - Added `server`, `serve`, and `prerender` scripts

If you apply those changes to your own project, and make sure you change the occurences
of `example` to the name of your own application, you should have a working SSR setup
using Fastify.

You can then run:

```shell
npm run dev:ssr
```

## Todo

[x] Add documentation, including how to install

[x] Create an example project

[ ] Create a schematic for easy integration

[ ] Add automated tests

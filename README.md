# ng-fastify

Fastify Engine for running Angular Universal

## Description

When calling the `ngFastifyEngine` builder, it internally creates an Angular `CommonEngine` 
using the setup options passed to the function and return a Fastify Plugin that is 
then registered calling `fastify.register` (see the `server.ts` file in the 
example).

The plugin [decorates](https://www.fastify.io/docs/latest/Decorators/) the reply 
with a function called `view`. This function calls the `render` method of the `CommonEngine`
previously initialized and returns the rendered Angular app.

The plugin also creates a route on `/*`, intercepting all GET requests to the server. 
This interceptor then simply set the `content-type` of the reply to `text/html` and call
the `view` decorator.

The value returned by the engine is sent back to the client as the body of the response.

## Install

Run this command, it will install `ng-fastify` and its dependencies:

```shell
npm i --save ng-fastify @angular/platform-server @nguniversal/builders fastify fastify-static
```
##  Example

In `/example` we created a standard Angular application generate by `ng new` on which
we have added server-side rendering and serve it using [Fastify](https://www.fastify.io/), basically, what
you probably want to do on your application if you read this documentation up to here.

The changes made are as following :

- Create `server.ts` an copy the content from the example
- Create `src/main.server.ts` an copy the content from the example
- Create `src/app/app.server.module.ts` an copy the content from the example
- Create `tsconfig.server.json` an copy the content from the example


- Change `app.module.ts` to add server transition and appId
- Change `angular.json` - Add `server`, `serve`, and `prerender` architects 
- Change `package.json` - Add `server`, `serve`, and `prerender` scripts

If you apply those changes to your own project, and make sure you change the occurrences
of `example` to the name of your own application, you should have a working SSR setup
using Fastify.

You can then run:

```shell
npm run dev:ssr
```
or
```shell
npm run dev:ssr
```

Later, I will create a schematic to make this installation easier.

## Disclaimer

This library is heavily based on the [ngExpressEngine](https://www.npmjs.com/package/@nguniversal/express-engine).

If you find any bug, please report them in the issues tracker and I will have a look at it. If you
want to contribute, feel free to make a PR.

## Todo

[x] Add documentation, including how to install

[x] Create an example project

[ ] Create a schematic for easy integration

[ ] Add automated tests everywhere

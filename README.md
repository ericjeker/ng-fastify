# ng-fastify

Fastify Engine for running Angular Universal

## Explanations

ng-fastify create a `CommonEngine` with the setup options passed to the `ngFastifyEngine`.

It then creates a Fastify Plugin that you must register calling `fastify.register` (see the example).

The plugin [decorates](https://www.fastify.io/docs/latest/Decorators/) the reply 
with a function called `view`. This function call the `render` method of the `CommonEngine`
previously initialized and return its value.

The plugin also creates a route on `/*`, intercepting all GET requests to the server. 
This interceptor then simply set the `content-type` of the reply to `text/html` and call
the `view` decorator.

The value returned by the engine is sent back to the client as the body of the response.

## Todo

[] Add tests
[] Add load of documentation, including how to install
[] Create an example project
[] Create a schematic for easy integration

import 'zone.js/dist/zone-node';
import { FastifyPluginCallback, FastifyReply, FastifyRequest } from 'fastify';
import { CommonEngine, RenderOptions as CommonRenderOptions } from '@nguniversal/common/engine';
import { APP_BASE_HREF } from '@angular/common';
import { StaticProvider } from '@angular/core';
import { REQUEST, RESPONSE } from '../tokens';

/**
 * These are the allowed options for the engine
 */
export type NgFastifyOptions = {filePath: string};
export type NgSetupOptions = NgFastifyOptions & Pick<CommonRenderOptions,
  'bootstrap' | 'providers' | 'publicPath' | 'inlineCriticalCss'>;

/**
 * Get providers of the request and response
 */
function getReqProviders(req: FastifyRequest, reply: FastifyReply): StaticProvider[] {
  const providers: StaticProvider[] = [
    {
      provide: REQUEST,
      useValue: req.raw,
    },
  ];

  providers.push({
    provide: RESPONSE,
    useValue: reply.raw,
  });

  return providers;
}

/**
 * Generate a Fastify Plugin that create a rendering engine called view
 *
 * @param setupOptions
 */
export const ngFastifyEngine = (
  setupOptions: NgSetupOptions,
): FastifyPluginCallback => {
  const engine = new CommonEngine(setupOptions.bootstrap, setupOptions.providers);

  // Return the plugin factory
  return async function ngFastifyPlugin(fastify) {
    const { filePath, ...remaining } = setupOptions;
    const renderOptions = remaining as CommonRenderOptions;
    if (!setupOptions.bootstrap && !renderOptions.bootstrap) {
      throw new Error('You must pass in a NgModule to be bootstrapped');
    }

    // Generate the Fastify decorator
    fastify.decorateReply('view', (request: FastifyRequest, reply: FastifyReply): Promise<string> => {
      renderOptions.url = `${request.protocol}://${request.hostname || ''}${request.url}` || renderOptions.url || '/';
      renderOptions.documentFilePath = renderOptions.documentFilePath || filePath || 'index.html';
      renderOptions.providers = [
        ...(renderOptions.providers || []),
        { provide: APP_BASE_HREF, useValue: fastify.prefix },
        getReqProviders(request, reply),
      ];

      return engine.render(renderOptions);
    });

    // @ts-ignore
    fastify.get('/*', (req, reply) => reply.header('content-type', 'text/html').view(req, reply));
  };
};

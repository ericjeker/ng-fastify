import 'zone.js/dist/zone-node';
import { FastifyPluginCallback } from 'fastify';
import { RenderOptions as CommonRenderOptions } from '@nguniversal/common/engine';
/**
 * These are the allowed options for the engine
 */
export declare type NgFastifyOptions = {
    filePath: string;
};
export declare type NgSetupOptions = NgFastifyOptions & Pick<CommonRenderOptions, 'bootstrap' | 'providers' | 'publicPath' | 'inlineCriticalCss'>;
/**
 * Generate a Fastify Plugin that create a rendering engine called view
 *
 * @param setupOptions
 */
export declare const ngFastifyEngine: (setupOptions: NgSetupOptions) => FastifyPluginCallback;

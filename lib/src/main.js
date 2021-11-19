var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import 'zone.js/dist/zone-node';
import { CommonEngine } from '@nguniversal/common/engine';
import { APP_BASE_HREF } from '@angular/common';
import { REQUEST, RESPONSE } from '../tokens';
/**
 * Get providers of the request and response
 */
function getReqProviders(req, reply) {
    const providers = [
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
export const ngFastifyEngine = (setupOptions) => {
    const engine = new CommonEngine(setupOptions.bootstrap, setupOptions.providers);
    // Return the plugin factory
    return function ngFastifyPlugin(fastify) {
        return __awaiter(this, void 0, void 0, function* () {
            const { filePath } = setupOptions, remaining = __rest(setupOptions, ["filePath"]);
            const renderOptions = remaining;
            if (!setupOptions.bootstrap && !renderOptions.bootstrap) {
                throw new Error('You must pass in a NgModule to be bootstrapped');
            }
            // Generate the Fastify decorator
            fastify.decorateReply('view', (request, reply) => {
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
        });
    };
};

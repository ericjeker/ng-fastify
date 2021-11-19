import { InjectionToken } from '@angular/core';
import { FastifyReply, FastifyRequest } from 'fastify';
export declare const REQUEST: InjectionToken<FastifyRequest>;
export declare const RESPONSE: InjectionToken<FastifyReply>;

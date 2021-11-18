import { InjectionToken } from '@angular/core';
import { FastifyReply, FastifyRequest } from 'fastify';

export const REQUEST: InjectionToken<FastifyRequest> = new InjectionToken<FastifyRequest>('REQUEST');
export const RESPONSE: InjectionToken<FastifyReply> = new InjectionToken<FastifyReply>('RESPONSE');

import { InflightKeyGenerator, MiddlewareContext } from '../typings';
export declare type Inflight = Required<Pick<MiddlewareContext, 'cacheHit' | 'response'>>;
export declare const singleFlightMiddleware: (ctx: MiddlewareContext, next: () => Promise<void>) => Promise<void>;
export declare const inflightURL: InflightKeyGenerator;
export declare const inflightUrlWithQuery: InflightKeyGenerator;

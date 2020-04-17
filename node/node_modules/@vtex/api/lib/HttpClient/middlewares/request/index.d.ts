import { AxiosRequestConfig } from 'axios';
import { Limit } from 'p-limit';
import { MiddlewareContext } from '../../typings';
export interface DefaultMiddlewareArgs {
    baseURL: string | undefined;
    rawHeaders: Record<string, string>;
    params: Record<string, string> | undefined;
    timeout: number;
    retries?: number;
    verbose?: boolean;
    exponentialTimeoutCoefficient?: number;
    initialBackoffDelay?: number;
    exponentialBackoffCoefficient?: number;
    httpsAgent?: AxiosRequestConfig['httpsAgent'];
}
export declare const defaultsMiddleware: ({ baseURL, rawHeaders, params, timeout, retries, verbose, exponentialTimeoutCoefficient, initialBackoffDelay, exponentialBackoffCoefficient, httpsAgent }: DefaultMiddlewareArgs) => (ctx: MiddlewareContext, next: () => Promise<void>) => Promise<void>;
export declare const routerCacheMiddleware: (ctx: MiddlewareContext, next: () => Promise<void>) => Promise<void>;
export declare const requestMiddleware: (limit?: Limit | undefined) => (ctx: MiddlewareContext, next: () => Promise<void>) => Promise<void>;

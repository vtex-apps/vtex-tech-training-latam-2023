import { AxiosRequestConfig } from 'axios';
import { MiddlewareContext } from '../typings';
export declare const acceptNotFoundMiddleware: (ctx: MiddlewareContext, next: () => Promise<void>) => Promise<void>;
export declare const notFoundFallbackMiddleware: (ctx: MiddlewareContext, next: () => Promise<void>) => Promise<void>;
export declare type IgnoreNotFoundRequestConfig = AxiosRequestConfig & {
    nullIfNotFound?: boolean;
};

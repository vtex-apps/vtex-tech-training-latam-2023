import { MiddlewareContext } from '../typings';
export declare type Memoized = Required<Pick<MiddlewareContext, 'cacheHit' | 'response'>>;
interface MemoizationOptions {
    memoizedCache: Map<string, Promise<Memoized>>;
}
export declare const memoizationMiddleware: ({ memoizedCache }: MemoizationOptions) => (ctx: MiddlewareContext, next: () => Promise<void>) => Promise<void>;
export {};

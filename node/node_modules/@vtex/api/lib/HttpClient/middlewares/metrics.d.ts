import { MetricsAccumulator } from '../../metrics/MetricsAccumulator';
import { MiddlewareContext } from '../typings';
interface MetricsOpts {
    metrics?: MetricsAccumulator;
    serverTiming?: Record<string, string>;
    name?: string;
}
export declare const metricsMiddleware: ({ metrics, serverTiming, name }: MetricsOpts) => (ctx: MiddlewareContext, next: () => Promise<void>) => Promise<void>;
export {};

import { EnvMetric } from '../service/worker/runtime/statusTrack';
export interface Metric {
    name: string;
    [key: string]: number | string | null;
}
interface GetStats {
    getStats(): {
        [key: string]: number | boolean | string | undefined;
    };
}
export declare class MetricsAccumulator {
    private metricsMillis;
    private extensions;
    private cacheMap;
    private onFlushMetrics;
    constructor();
    batchMetric: (name: string, timeMillis?: number | undefined, extensions?: Record<string, string | number> | undefined) => void;
    /**
     * Batches a named metric which took `diffNs`.
     *
     * @param name Metric label.
     * @param diffNs The result of calling process.hrtime() passing a previous process.hrtime() value.
     * @param extensions Any other relevant properties of this metric.
     *
     * @see https://nodejs.org/api/process.html#process_process_hrtime_time
     */
    batch: (name: string, diffNs?: [number, number] | undefined, extensions?: Record<string, string | number> | undefined) => void;
    addOnFlushMetric: (metricFn: () => Metric | Metric[]) => void;
    trackCache: (name: string, cacheInstance: GetStats) => void;
    statusTrack: () => EnvMetric[];
    private metricToAggregate;
    private cacheToMetric;
    private flushMetrics;
}
export {};

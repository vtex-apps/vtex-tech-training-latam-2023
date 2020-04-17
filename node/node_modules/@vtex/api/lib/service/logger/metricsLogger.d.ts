/// <reference types="node" />
interface ProcessEnv {
    appName: string;
    appVersion: string;
    region: string;
    vendor: string;
    production: boolean;
}
interface Key {
    name: string;
}
interface Metric {
    Count: number;
    Data: {
        key: Key;
        processEnv: ProcessEnv;
        summary: NumericSummary | NodeJS.MemoryUsage | NodeJS.CpuUsage;
    };
    Max: number;
    Min: number;
    Name: string;
    Sum: number;
    Timestamp: number;
    Unit: string;
}
interface NumericSummary {
    count: number;
    max: number;
    median: number;
    min: number;
    percentile95: number;
    percentile99: number;
    sum: number;
}
export declare class MetricsLogger {
    add: (key: Key, value: number) => void;
    getSummaries: () => Metric[];
    constructor();
}
export {};

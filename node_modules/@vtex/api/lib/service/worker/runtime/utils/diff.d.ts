/// <reference types="node" />
export interface Snapshot {
    usage: NodeJS.CpuUsage;
    time: number;
}
interface CpuUsage {
    user: number;
    system: number;
}
export declare function cpuSnapshot(): Snapshot;
export declare function snapshotDiff(curr: Snapshot, last: Snapshot): CpuUsage;
export {};

import { ServiceContext } from './typings';
export declare type StatusTrack = () => EnvMetric[];
export interface NamedMetric {
    name: string;
    [key: string]: any;
}
export interface EnvMetric extends NamedMetric {
    production: boolean;
}
export declare const isStatusTrack: (message: any) => message is "statusTrack";
export declare const isStatusTrackBroadcast: (message: any) => message is "broadcastStatusTrack";
export declare const statusTrackHandler: (ctx: ServiceContext<import("../../..").IOClients, import("./typings").RecorderState, import("./typings").ParamsContext>) => Promise<void>;
export declare const trackStatus: () => void;
export declare const broadcastStatusTrack: () => void;

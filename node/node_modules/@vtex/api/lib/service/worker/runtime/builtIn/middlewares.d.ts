import { ServiceContext } from '../typings';
export declare function recorderMiddleware(ctx: ServiceContext, next: () => Promise<void>): Promise<void>;
export declare const addMetricsLoggerMiddleware: () => (ctx: ServiceContext<import("../../../..").IOClients, import("../typings").RecorderState, import("../typings").ParamsContext>, next: () => Promise<void>) => Promise<void>;
export declare const prometheusLoggerMiddleware: () => (ctx: ServiceContext<import("../../../..").IOClients, import("../typings").RecorderState, import("../typings").ParamsContext>, next: () => Promise<void>) => Promise<void>;

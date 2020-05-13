import { ServiceContext, ServiceJSON } from '../typings';
export declare const whoAmIHandler: ({ events, routes, }: ServiceJSON) => (ctx: ServiceContext<import("../../../..").IOClients, import("../typings").RecorderState, import("../typings").ParamsContext>) => void;
export declare const healthcheckHandler: ({ events, routes, }: ServiceJSON) => (ctx: ServiceContext<import("../../../..").IOClients, import("../typings").RecorderState, import("../typings").ParamsContext>) => void;
export declare const metricsLoggerHandler: (ctx: ServiceContext<import("../../../..").IOClients, import("../typings").RecorderState, import("../typings").ParamsContext>) => void;

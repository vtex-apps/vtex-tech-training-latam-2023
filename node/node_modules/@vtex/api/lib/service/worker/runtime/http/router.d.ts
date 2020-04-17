import { HttpRoute, ServiceContext } from '../typings';
export declare const routerFromPublicHttpHandlers: (routes: Record<string, HttpRoute>) => (ctx: ServiceContext<import("../../../..").IOClients, import("../typings").RecorderState, import("../typings").ParamsContext>, next: () => Promise<void>) => Promise<void>;

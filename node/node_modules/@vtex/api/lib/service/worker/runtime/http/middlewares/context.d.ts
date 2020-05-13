import { IOClients } from '../../../../../clients/IOClients';
import { ParamsContext, RecorderState, ServiceContext, ServiceRoute } from './../../typings';
export declare const createPvtContextMiddleware: (routeId: string, { smartcache }: ServiceRoute) => <T extends IOClients, U extends RecorderState, V extends ParamsContext>(ctx: ServiceContext<T, U, V>, next: () => Promise<void>) => Promise<void>;
export declare const createPubContextMiddleware: (routeId: string, { smartcache }: ServiceRoute) => <T extends IOClients, U extends RecorderState, V extends ParamsContext>(ctx: ServiceContext<T, U, V>, next: () => Promise<void>) => Promise<void>;

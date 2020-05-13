import { IOClients } from '../../../../clients/IOClients';
import { ClientsConfig, ParamsContext, RecorderState, ServiceContext, ServiceEvent } from '../typings';
export declare const createEventHandler: <T extends IOClients, U extends RecorderState, V extends ParamsContext>(clientsConfig: ClientsConfig<T>, eventId: string, handler: import("koa-compose").Middleware<import("../typings").EventContext<T, U>> | import("koa-compose").Middleware<import("../typings").EventContext<T, U>>[], serviceEvent: ServiceEvent | undefined) => import("koa-compose").ComposedMiddleware<ServiceContext<T, U, V>>;

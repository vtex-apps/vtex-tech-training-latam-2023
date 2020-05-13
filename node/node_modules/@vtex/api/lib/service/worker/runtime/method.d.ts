import { IOClients } from '../../../clients/IOClients';
import { ParamsContext, RecorderState, RouteHandler, ServiceContext } from './typings';
declare type HTTPMethods = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE' | 'PATCH' | 'DEFAULT';
declare type MethodOptions<ClientsT extends IOClients = IOClients, StateT extends RecorderState = RecorderState, CustomT extends ParamsContext = ParamsContext> = Partial<Record<HTTPMethods, RouteHandler<ClientsT, StateT, CustomT> | Array<RouteHandler<ClientsT, StateT, CustomT>>>>;
export declare function method<T extends IOClients, U extends RecorderState, V extends ParamsContext>(options: MethodOptions<T, U, V>): {
    (ctx: ServiceContext<T, U, V>, next: () => Promise<void>): Promise<void>;
    skipTimer: boolean;
};
export {};

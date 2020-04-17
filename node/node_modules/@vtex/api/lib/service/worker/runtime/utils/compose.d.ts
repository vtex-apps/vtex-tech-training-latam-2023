import koaCompose from 'koa-compose';
import { IOClients } from '../../../../clients/IOClients';
import { ParamsContext, RecorderState } from '../typings';
export declare const compose: <ClientsT extends IOClients, StateT extends RecorderState, CustomT extends ParamsContext>(middlewares: koaCompose.Middleware<import("../typings").ServiceContext<ClientsT, StateT, CustomT>>[]) => koaCompose.ComposedMiddleware<import("../typings").ServiceContext<ClientsT, StateT, CustomT>>;
export declare const composeForEvents: <ClientsT extends IOClients, StateT extends RecorderState>(middlewares: koaCompose.Middleware<import("../typings").EventContext<ClientsT, StateT>>[]) => koaCompose.ComposedMiddleware<import("../typings").EventContext<ClientsT, StateT>>;

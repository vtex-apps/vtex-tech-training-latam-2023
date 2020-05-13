import { ParamsContext, RecorderState, RouteHandler } from '../service/worker/runtime/typings';
import { IOClients } from './../clients/IOClients';
export declare function cancel<T extends IOClients, U extends RecorderState, V extends ParamsContext>(middleware: RouteHandler<T, U, V>): RouteHandler<T, U, V>;

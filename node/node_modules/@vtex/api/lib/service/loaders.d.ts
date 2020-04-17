import { IOClients } from '../clients/IOClients';
import { Service } from './worker/runtime/Service';
import { ParamsContext, RecorderState, ServiceJSON } from './worker/runtime/typings';
export declare const appPath: string;
export declare const bundlePath: string;
export declare const serviceJsonPath: string;
export declare const getServiceJSON: () => ServiceJSON;
export declare const getService: () => Service<IOClients, RecorderState, ParamsContext>;

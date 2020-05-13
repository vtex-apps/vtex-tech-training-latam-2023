import { IOContext } from '../service/worker/runtime/typings';
import { HttpClient } from '../HttpClient/HttpClient';
import { InstanceOptions } from '../HttpClient/typings';
export declare type IOClientConstructor = new (context: IOContext, options?: InstanceOptions) => IOClient;
/**
 * A client that can be instantiated by the Serviceruntime layer.
 */
export declare class IOClient {
    protected context: IOContext;
    protected options?: InstanceOptions | undefined;
    protected http: HttpClient;
    constructor(context: IOContext, options?: InstanceOptions | undefined);
}

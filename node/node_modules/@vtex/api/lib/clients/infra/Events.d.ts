import { InstanceOptions, RequestTracingConfig } from '../../HttpClient';
import { IOContext } from '../../service/worker/runtime/typings';
import { InfraClient } from './InfraClient';
export declare class Events extends InfraClient {
    constructor(context: IOContext, options?: InstanceOptions);
    sendEvent: (subject: string, route: string, message?: any, tracingConfig?: RequestTracingConfig | undefined) => Promise<void>;
}

import { InstanceOptions, RequestTracingConfig } from '../../HttpClient';
import { HousekeeperStatesAndUpdates } from '../../responses';
import { IOContext } from '../../service/worker/runtime/typings';
import { InfraClient } from './InfraClient';
export declare class Housekeeper extends InfraClient {
    constructor(context: IOContext, options?: InstanceOptions);
    apply: (data: HousekeeperStatesAndUpdates, tracingConfig?: RequestTracingConfig | undefined) => Promise<void>;
    perform: (tracingConfig?: RequestTracingConfig | undefined) => Promise<void>;
    resolve: (tracingConfig?: RequestTracingConfig | undefined) => Promise<HousekeeperStatesAndUpdates>;
}

import { InstanceOptions, RequestTracingConfig } from '../../HttpClient';
import { IOContext } from '../../service/worker/runtime/typings';
import { AppClient } from './AppClient';
export declare class Billing extends AppClient {
    constructor(context: IOContext, options?: InstanceOptions);
    status: (tracingConfig?: RequestTracingConfig | undefined) => Promise<ContractStatus>;
}
export declare enum ContractStatus {
    ACTIVE = "active_contract",
    INACTIVE = "inactive_contract",
    NO_CONTRACT = "no_contract"
}

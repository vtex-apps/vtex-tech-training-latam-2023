import { InstanceOptions, RequestTracingConfig } from '../../HttpClient/typings';
import { IOContext } from '../../service/worker/runtime/typings';
import { InfraClient } from './InfraClient';
export declare class Sphinx extends InfraClient {
    constructor(ioContext: IOContext, opts?: InstanceOptions);
    validatePolicies: (policies: PolicyRequest[], tracingConfig?: RequestTracingConfig | undefined) => Promise<void>;
    isAdmin: (email: string, tracingConfig?: RequestTracingConfig | undefined) => Promise<boolean>;
}
export interface PolicyRequest {
    name: string;
    reason: string;
    attrs: Record<string, string>;
}

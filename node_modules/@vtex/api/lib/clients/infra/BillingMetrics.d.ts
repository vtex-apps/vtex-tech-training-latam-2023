import { InstanceOptions, RequestTracingConfig } from '../../HttpClient';
import { IOContext } from '../../service/worker/runtime/typings';
import { InfraClient } from './InfraClient';
export declare class BillingMetrics extends InfraClient {
    constructor(context: IOContext, options?: InstanceOptions);
    sendMetric: (metric: BillingMetric, tracingConfig?: RequestTracingConfig | undefined) => Promise<BillingMetric>;
}
export interface BillingMetric {
    value: number;
    unit: string;
    metricId: string;
    timestamp?: number;
}

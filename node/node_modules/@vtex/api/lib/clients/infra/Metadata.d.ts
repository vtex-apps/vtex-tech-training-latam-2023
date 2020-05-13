import { InstanceOptions, RequestTracingConfig } from '../../HttpClient';
import { BucketMetadata } from '../../responses';
import { IOContext } from '../../service/worker/runtime/typings';
import { InfraClient } from './InfraClient';
export interface MetadataEntry {
    Key: string;
    Hash: string;
    Value: any;
}
export interface MetadataEntryList {
    Data: MetadataEntry[];
    Next: string;
}
export declare class Metadata extends InfraClient {
    constructor(context: IOContext, options?: InstanceOptions);
    getBuckets: (bucket: string, tracingConfig?: RequestTracingConfig | undefined) => Promise<BucketMetadata>;
    list: (bucket: string, includeValue: boolean, limit?: number | undefined, nextMarker?: string | undefined, tracingConfig?: RequestTracingConfig | undefined) => Promise<MetadataEntryList>;
    listAll: (bucket: string, includeValue: boolean, tracingConfig?: RequestTracingConfig | undefined) => Promise<MetadataEntryList>;
    get: (bucket: string, key: string, tracingConfig?: RequestTracingConfig | undefined) => Promise<any>;
    save: (bucket: string, key: string, data: any, tracingConfig?: RequestTracingConfig | undefined) => Promise<void>;
    saveAll: (bucket: string, data: {
        [key: string]: any;
    }, tracingConfig?: RequestTracingConfig | undefined) => Promise<void>;
    delete: (bucket: string, key: string, tracingConfig?: RequestTracingConfig | undefined) => Promise<import("../../HttpClient").IOResponse<void>>;
    deleteAll: (bucket: string, tracingConfig?: RequestTracingConfig | undefined) => Promise<import("../../HttpClient").IOResponse<void>>;
}

import { InstanceOptions, RequestTracingConfig } from '../../HttpClient';
import { IOContext } from '../../service/worker/runtime/typings';
import { InfraClient } from './InfraClient';
export declare class Router extends InfraClient {
    constructor(ioContext: IOContext, opts?: InstanceOptions);
    listAvailableIoVersions: (tracingConfig?: RequestTracingConfig | undefined) => Promise<AvaiableIO[]>;
    getInstalledIoVersion: (tracingConfig?: RequestTracingConfig | undefined) => Promise<AvaiableIO>;
    installIo: (version: string, tracingConfig?: RequestTracingConfig | undefined) => Promise<void>;
    listAvailableServices: (tracingConfig?: RequestTracingConfig | undefined) => Promise<AvailableServices>;
    getAvailableVersions: (name: string, tracingConfig?: RequestTracingConfig | undefined) => Promise<AvailableServiceVersions>;
    listInstalledServices: (tracingConfig?: RequestTracingConfig | undefined) => Promise<InstalledService[]>;
    installService: (name: string, version: string, tracingConfig?: RequestTracingConfig | undefined) => Promise<void>;
}
export interface AvaiableIO {
    version: string;
    tested: boolean;
    services: {
        [service: string]: string;
    };
}
export declare type InstalledIO = AvaiableIO;
export interface AvailableServiceVersions {
    versions: {
        [region: string]: string[];
    };
}
export interface AvailableServices {
    [service: string]: AvailableServiceVersions;
}
export interface InstalledService {
    name: string;
    version: string;
    serviceIsolation: number;
}

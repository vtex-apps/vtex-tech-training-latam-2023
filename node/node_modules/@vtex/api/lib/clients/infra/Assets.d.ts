/// <reference types="node" />
import { Readable } from 'stream';
import { AppMetaInfo } from '../..';
import { InstanceOptions, RequestTracingConfig } from '../../HttpClient';
import { IOContext } from '../../service/worker/runtime/typings';
import { InfraClient } from './InfraClient';
export interface AssetsParams {
    files?: string[];
    pick?: string[];
}
export declare class Assets extends InfraClient {
    private routes;
    constructor(context: IOContext, options?: InstanceOptions);
    getSettings(dependencies: AppMetaInfo[], appAtMajor: string, params?: AssetsParams, tracingConfig?: RequestTracingConfig): Promise<Record<string, any>[]>;
    getBuildJSONForApp(app: AppMetaInfo, appVendorName: string, pick?: string | string[], tracingConfig?: RequestTracingConfig): Promise<Record<string, any>>;
    getSettingsFromFilesForApp(app: AppMetaInfo, files?: string | string[], tracingConfig?: RequestTracingConfig): Promise<Record<string, any>>;
    getJSON<T extends object | null>(appId: string, file: string, nullIfNotFound?: boolean, tracingConfig?: RequestTracingConfig): Promise<T>;
    getFile(appId: string, file: string, nullIfNotFound?: boolean, tracingConfig?: RequestTracingConfig): Promise<{
        data: Buffer;
        headers: any;
    }>;
    getFilteredDependencies(apps: string | string[], dependencies: AppMetaInfo[]): AppMetaInfo[];
    getAppBundleByVendor: (app: string, bundlePath: string, generatePackageJson: boolean, tracingConfig?: RequestTracingConfig | undefined) => Promise<Readable>;
    protected getAppJSONByAccount: <T extends object | null>(app: string, path: string, nullIfNotFound?: boolean | undefined, tracingConfig?: RequestTracingConfig | undefined) => Promise<T>;
    protected getAppJSONByVendor: <T extends object | null>(app: string, path: string, nullIfNotFound?: boolean | undefined, tracingConfig?: RequestTracingConfig | undefined) => Promise<T>;
    protected getAppFileByAccount: (app: string, path: string, nullIfNotFound?: boolean | undefined, tracingConfig?: RequestTracingConfig | undefined) => Promise<{
        data: Buffer;
        headers: any;
    }>;
    protected getAppFileByVendor: (app: string, path: string, nullIfNotFound?: boolean | undefined, tracingConfig?: RequestTracingConfig | undefined) => Promise<{
        data: Buffer;
        headers: any;
    }>;
}

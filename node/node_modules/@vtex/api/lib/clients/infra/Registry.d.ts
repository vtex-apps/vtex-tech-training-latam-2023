/// <reference types="node" />
import { IncomingMessage } from 'http';
import { Readable, Writable } from 'stream';
import { ZlibOptions } from 'zlib';
import { InstanceOptions, RequestTracingConfig } from '../../HttpClient';
import { AppBundlePublished, AppFilesList, AppManifest } from '../../responses';
import { IOContext } from '../../service/worker/runtime/typings';
import { InfraClient } from './InfraClient';
export declare class Registry extends InfraClient {
    constructor(context: IOContext, options?: InstanceOptions);
    publishApp: (files: File[], tag?: string | undefined, { zlib }?: ZipOptions, tracingConfig?: RequestTracingConfig | undefined) => Promise<AppBundlePublished>;
    publishAppRc: (files: File[], tag?: string | undefined, { zlib }?: ZipOptions, tracingConfig?: RequestTracingConfig | undefined) => Promise<AppBundlePublished>;
    listApps: (tracingConfig?: RequestTracingConfig | undefined) => Promise<RegistryAppsList>;
    listVersionsByApp: (app: string, tracingConfig?: RequestTracingConfig | undefined) => Promise<RegistryAppVersionsList>;
    deprecateApp: (app: string, version: string, tracingConfig?: RequestTracingConfig | undefined) => Promise<void>;
    undeprecateApp: (app: string, version: string, tracingConfig?: RequestTracingConfig | undefined) => Promise<void>;
    validateApp: (app: string, version: string, tracingConfig?: RequestTracingConfig | undefined) => Promise<void>;
    getAppManifest: (app: string, version: string, opts?: AppsManifestOptions | undefined, tracingConfig?: RequestTracingConfig | undefined) => Promise<AppManifest>;
    listAppFiles: (app: string, version: string, opts?: ListAppFilesOptions | undefined, tracingConfig?: RequestTracingConfig | undefined) => Promise<AppFilesList>;
    getAppFile: (app: string, version: string, path: string, tracingConfig?: RequestTracingConfig | undefined) => Promise<{
        data: Buffer;
        headers: any;
    }>;
    getAppJSON: <T extends object | null>(app: string, version: string, path: string, nullIfNotFound?: boolean | undefined, tracingConfig?: RequestTracingConfig | undefined) => Promise<T>;
    getAppFileStream: (app: string, version: string, path: string, tracingConfig?: RequestTracingConfig | undefined) => Promise<IncomingMessage>;
    getAppBundle: (app: string, version: string, bundlePath: string, generatePackageJson: boolean, tracingConfig?: RequestTracingConfig | undefined) => Promise<Readable>;
    unpackAppBundle: (app: string, version: string, bundlePath: string, unpackPath: string, generatePackageJson: boolean, tracingConfig?: RequestTracingConfig | undefined) => Promise<Writable>;
    resolveDependenciesWithManifest: (manifest: AppManifest, filter?: string, tracingConfig?: RequestTracingConfig | undefined) => Promise<Record<string, string[]>>;
    private publish;
}
interface ZipOptions {
    zlib?: ZlibOptions;
}
export interface AppsManifestOptions {
    resolveDeps: boolean;
}
export interface ListAppFilesOptions {
    prefix: string;
}
export interface RegistryAppsListItem {
    partialIdentifier: string;
    location: string;
}
export interface RegistryAppsList {
    data: RegistryAppsListItem[];
}
export interface RegistryAppVersionsListItem {
    versionIdentifier: string;
    location: string;
}
export interface RegistryAppVersionsList {
    data: RegistryAppVersionsListItem[];
}
export interface File {
    path: string;
    content: any;
}
export {};

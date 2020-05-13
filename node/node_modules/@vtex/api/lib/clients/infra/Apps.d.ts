/// <reference types="node" />
import { IncomingMessage } from 'http';
import { Readable, Writable } from 'stream';
import { ZlibOptions } from 'zlib';
import { InstanceOptions, RequestTracingConfig } from '../../HttpClient';
import { AppBundleLinked, AppFilesList, AppManifest } from '../../responses';
import { IOContext } from '../../service/worker/runtime/typings';
import { InfraClient } from './InfraClient';
export declare class Apps extends InfraClient {
    private _routes;
    private diskCache;
    private memoryCache;
    private get routes();
    constructor(context: IOContext, options?: InstanceOptions);
    installApp: (descriptor: string, tracingConfig?: RequestTracingConfig | undefined) => Promise<void> | Promise<AppInstallResponse>;
    uninstallApp: (app: string, tracingConfig?: RequestTracingConfig | undefined) => Promise<import("../..").IOResponse<void>>;
    acknowledgeApp: (app: string, service: string, tracingConfig?: RequestTracingConfig | undefined) => Promise<void>;
    link: (app: string, files: Change[], { zlib }?: ZipOptions, tracingConfig?: RequestTracingConfig | undefined) => Promise<AppBundleLinked>;
    patch: (app: string, changes: Change[], { zlib }?: ZipOptions, tracingConfig?: RequestTracingConfig | undefined) => Promise<void>;
    unlink: (app: string, tracingConfig?: RequestTracingConfig | undefined) => Promise<import("../..").IOResponse<void>>;
    unlinkAll: (tracingConfig?: RequestTracingConfig | undefined) => Promise<import("../..").IOResponse<void>>;
    saveAppSettings: (app: string, settings: any, tracingConfig?: RequestTracingConfig | undefined) => Promise<void>;
    listApps: ({ oldVersion, since, service }?: ListAppsOptions, tracingConfig?: RequestTracingConfig | undefined) => Promise<AppsList>;
    listAppFiles: (app: string, { prefix, nextMarker }?: ListFilesOptions, tracingConfig?: RequestTracingConfig | undefined) => Promise<AppFilesList>;
    listLinks: (tracingConfig?: RequestTracingConfig | undefined) => Promise<string[]>;
    getAppFile: (app: string, path: string, staleIfError?: boolean | undefined, tracingConfig?: RequestTracingConfig | undefined) => Promise<{
        data: Buffer;
        headers: any;
    }>;
    getAppJSON: <T extends object | null>(app: string, path: string, nullIfNotFound?: boolean | undefined, tracingConfig?: RequestTracingConfig | undefined) => Promise<T>;
    getFileFromApps: <T extends object | null>(app: string, path: string, nullIfNotFound?: boolean | undefined, tracingConfig?: RequestTracingConfig | undefined) => Promise<T>;
    getAppFileStream: (app: string, path: string, tracingConfig?: RequestTracingConfig | undefined) => Promise<IncomingMessage>;
    getApp: (app: string, tracingConfig?: RequestTracingConfig | undefined) => Promise<AppManifest>;
    getAppSettings: (app: string, tracingConfig?: RequestTracingConfig | undefined) => Promise<any>;
    getAllAppsSettings: (listAppsOptions?: ListAppsOptions, tracingConfig?: RequestTracingConfig | undefined) => Promise<AppsSettings>;
    getAppBundle: (app: string, bundlePath: string, generatePackageJson: boolean, tracingConfig?: RequestTracingConfig | undefined) => Promise<Readable>;
    unpackAppBundle: (app: string, bundlePath: string, unpackPath: string, generatePackageJson: boolean, tracingConfig?: RequestTracingConfig | undefined) => Promise<Writable>;
    getAppsMetaInfos: (filter?: string | undefined, staleWhileRevalidate?: boolean, tracingConfig?: RequestTracingConfig | undefined) => Promise<AppMetaInfo[]>;
    getDependencies: (filter?: string, tracingConfig?: RequestTracingConfig | undefined) => Promise<Record<string, string[]>>;
    updateDependencies: (tracingConfig?: RequestTracingConfig | undefined) => Promise<Record<string, string[]>>;
    updateDependency: (name: string, version: string, registry: string, tracingConfig?: RequestTracingConfig | undefined) => Promise<void>;
    resolveDependencies: (apps: string[], registries: string[], filter?: string, tracingConfig?: RequestTracingConfig | undefined) => Promise<any>;
    resolveDependenciesWithManifest: (manifest: AppManifest, filter?: string, tracingConfig?: RequestTracingConfig | undefined) => Promise<Record<string, string[]>>;
    private installRuntime;
}
interface ZipOptions {
    zlib?: ZlibOptions;
}
export interface AppMetaInfo {
    id: string;
    settingsSchema?: Record<string, any>;
    _resolvedDependencies: Record<string, string>;
    _isRoot: boolean;
    _buildFeatures: Record<string, string[]>;
}
export interface WorkspaceMetaInfo {
    apps: AppMetaInfo[];
}
export interface AppsListItem {
    app: string;
    id: string;
    location: string;
}
export interface AppsList {
    data: AppsListItem[];
}
export interface Change {
    path: string;
    content: string | Readable | Buffer;
}
export interface ListAppsOptions {
    oldVersion?: string;
    context?: string[];
    since?: string;
    service?: string;
}
export interface ListFilesOptions {
    prefix?: string;
    context?: string[];
    nextMarker?: string;
}
export interface AppsSettings {
    [app: string]: any;
}
export interface AppInstallResponse {
    message: string;
}
export {};

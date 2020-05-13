/// <reference types="node" />
import { AppMetaInfo, Apps } from '..';
import { CacheLayer } from '../caches';
import { Logger } from '../service/logger';
export declare const getMetaInfoKey: (account: string, workspace: string) => string;
export declare const updateMetaInfoCache: (cacheStorage: CacheLayer<string, AppMetaInfo[]>, account: string, workspace: string, dependencies: AppMetaInfo[], logger: Logger) => Promise<void>;
export declare const saveVersion: (app: string, cacheStorage: CacheLayer<string, string>) => Promise<void>;
export declare const getFallbackFile: (app: string, path: string, cacheStorage: CacheLayer<string, string>, apps: Apps) => Promise<{
    data: Buffer;
    headers: any;
}>;

import { CacheLayer } from './CacheLayer';
import { LRUDiskCacheOptions, LRUStats } from './typings';
import { outputJSON, readJSON } from 'fs-extra';
export declare class LRUDiskCache<V> implements CacheLayer<string, V> {
    private cachePath;
    private readFile;
    private writeFile;
    private lock;
    private disposed;
    private hits;
    private total;
    private lruStorage;
    private keyToBeDeleted;
    constructor(cachePath: string, options: LRUDiskCacheOptions, readFile?: typeof readJSON, writeFile?: typeof outputJSON);
    has: (key: string) => boolean;
    getStats: (name?: string) => LRUStats;
    get: (key: string) => Promise<void | V>;
    set: (key: string, value: V, maxAge?: number | undefined) => Promise<boolean>;
    private getPathKey;
    private deleteFile;
}

import { CacheLayer } from './CacheLayer';
import { DiskStats } from './typings';
import { outputJSON, readJSON } from 'fs-extra';
export declare class DiskCache<V> implements CacheLayer<string, V> {
    private cachePath;
    private readFile;
    private writeFile;
    private hits;
    private total;
    private lock;
    constructor(cachePath: string, readFile?: typeof readJSON, writeFile?: typeof outputJSON);
    has: (key: string) => boolean;
    getStats: (name?: string) => DiskStats;
    get: (key: string) => Promise<void | V>;
    set: (key: string, value: V) => Promise<boolean>;
    private getPathKey;
}

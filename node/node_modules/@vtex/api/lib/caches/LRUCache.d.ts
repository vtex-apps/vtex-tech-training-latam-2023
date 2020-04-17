import LRU from 'lru-cache';
import { CacheLayer } from './CacheLayer';
import { FetchResult, LRUStats } from './typings';
export declare class LRUCache<K, V> implements CacheLayer<K, V> {
    private multilayer;
    private storage;
    private hits;
    private total;
    private disposed;
    constructor(options: LRU.Options<K, V>);
    get: (key: K) => void | V;
    getOrSet: (key: K, fetcher?: (() => Promise<FetchResult<V>>) | undefined) => Promise<void | V>;
    set: (key: K, value: V, maxAge?: number | undefined) => boolean;
    has: (key: K) => boolean;
    getStats: (name?: string) => LRUStats;
}

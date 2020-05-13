import { CacheLayer } from './CacheLayer';
import { FetchResult, MultilayerStats } from './typings';
export declare class MultilayeredCache<K, V> implements CacheLayer<K, V> {
    private caches;
    private hits;
    private total;
    constructor(caches: Array<CacheLayer<K, V>>);
    get: (key: K, fetcher?: (() => Promise<FetchResult<V>>) | undefined) => Promise<void | V>;
    set: (key: K, value: V, maxAge?: number | undefined) => Promise<boolean>;
    has: (key: K) => Promise<boolean>;
    getStats: (name?: string) => MultilayerStats;
    private findIndex;
    private resetCounters;
}

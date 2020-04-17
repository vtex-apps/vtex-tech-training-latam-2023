"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
class MultilayeredCache {
    constructor(caches) {
        this.caches = caches;
        this.hits = 0;
        this.total = 0;
        this.get = async (key, fetcher) => {
            let value;
            let maxAge;
            let successIndex = await this.findIndex(async (cache) => {
                const [getValue, hasKey] = await Promise.all([cache.get(key), cache.has(key)]);
                value = getValue;
                return hasKey;
            }, this.caches);
            if (successIndex === -1) {
                if (fetcher) {
                    const fetched = await fetcher();
                    value = fetched.value;
                    maxAge = fetched.maxAge;
                }
                else {
                    return undefined;
                }
                successIndex = Infinity;
            }
            const failedCaches = ramda_1.slice(0, successIndex, this.caches);
            const [firstPromise] = ramda_1.map(cache => cache.set(key, value, maxAge), failedCaches);
            await firstPromise;
            return value;
        };
        this.set = async (key, value, maxAge) => {
            const isSet = await Promise.all(ramda_1.map(cache => cache.set(key, value, maxAge), this.caches));
            return ramda_1.any(item => item, isSet);
        };
        this.has = async (key) => {
            const hasList = await Promise.all(ramda_1.map(cache => cache.has(key), this.caches));
            return ramda_1.any(item => item, hasList);
        };
        this.getStats = (name = 'multilayred-cache') => {
            const multilayerStats = {
                hitRate: this.total > 0 ? this.hits / this.total : undefined,
                hits: this.hits,
                name,
                total: this.total,
            };
            this.resetCounters();
            return multilayerStats;
        };
        this.findIndex = async (func, array) => {
            this.total += 1;
            for (let index = 0; index < array.length; index++) {
                const hasKey = await func(array[index]);
                if (hasKey) {
                    this.hits += 1;
                    return index;
                }
            }
            return -1;
        };
    }
    resetCounters() {
        this.hits = 0;
        this.total = 0;
    }
}
exports.MultilayeredCache = MultilayeredCache;

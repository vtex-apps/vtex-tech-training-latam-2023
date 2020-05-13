"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lru_cache_1 = __importDefault(require("lru-cache"));
const MultilayeredCache_1 = require("./MultilayeredCache");
class LRUCache {
    constructor(options) {
        this.get = (key) => {
            const value = this.storage.get(key);
            if (this.storage.has(key)) {
                this.hits += 1;
            }
            this.total += 1;
            return value;
        };
        this.getOrSet = async (key, fetcher) => this.multilayer.get(key, fetcher);
        this.set = (key, value, maxAge) => this.storage.set(key, value, maxAge);
        this.has = (key) => this.storage.has(key);
        this.getStats = (name = 'lru-cache') => {
            const stats = {
                disposedItems: this.disposed,
                hitRate: this.total > 0 ? this.hits / this.total : undefined,
                hits: this.hits,
                itemCount: this.storage.itemCount,
                length: this.storage.length,
                max: this.storage.max,
                name,
                total: this.total,
            };
            this.hits = 0;
            this.total = 0;
            this.disposed = 0;
            return stats;
        };
        this.hits = 0;
        this.total = 0;
        this.disposed = 0;
        this.storage = new lru_cache_1.default({
            ...options,
            dispose: () => this.disposed += 1,
            noDisposeOnSet: true,
        });
        this.multilayer = new MultilayeredCache_1.MultilayeredCache([this]);
    }
}
exports.LRUCache = LRUCache;

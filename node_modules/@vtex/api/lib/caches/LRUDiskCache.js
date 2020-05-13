"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const lru_cache_1 = __importDefault(require("lru-cache"));
const path_1 = require("path");
const rwlock_1 = __importDefault(require("rwlock"));
class LRUDiskCache {
    constructor(cachePath, options, readFile = fs_extra_1.readJSON, writeFile = fs_extra_1.outputJSON) {
        this.cachePath = cachePath;
        this.readFile = readFile;
        this.writeFile = writeFile;
        this.hits = 0;
        this.total = 0;
        this.has = (key) => this.lruStorage.has(key);
        this.getStats = (name = 'disk-lru-cache') => {
            const stats = {
                disposedItems: this.disposed,
                hitRate: this.total > 0 ? this.hits / this.total : undefined,
                hits: this.hits,
                itemCount: this.lruStorage.itemCount,
                length: this.lruStorage.length,
                max: this.lruStorage.max,
                name,
                total: this.total,
            };
            this.hits = 0;
            this.total = 0;
            this.disposed = 0;
            return stats;
        };
        this.get = async (key) => {
            const timeOfDeath = this.lruStorage.get(key);
            this.total += 1;
            if (timeOfDeath === undefined) {
                // if it is an outdated file when stale=false
                if (this.keyToBeDeleted) {
                    await this.deleteFile(key);
                }
                return undefined;
            }
            const pathKey = this.getPathKey(key);
            const data = await new Promise(resolve => {
                this.lock.readLock(key, async (release) => {
                    try {
                        const fileData = await this.readFile(pathKey);
                        release();
                        this.hits += 1;
                        resolve(fileData);
                    }
                    catch (e) {
                        release();
                        resolve(undefined);
                    }
                });
            });
            // if it is an outdated file when stale=true
            if (timeOfDeath < Date.now()) {
                this.lruStorage.del(key);
                await this.deleteFile(key);
            }
            return data;
        };
        this.set = async (key, value, maxAge) => {
            let timeOfDeath = NaN;
            if (maxAge) {
                timeOfDeath = maxAge + Date.now();
                this.lruStorage.set(key, timeOfDeath, maxAge);
            }
            else {
                this.lruStorage.set(key, NaN);
            }
            if (this.keyToBeDeleted && this.keyToBeDeleted !== key) {
                await this.deleteFile(this.keyToBeDeleted);
            }
            const pathKey = this.getPathKey(key);
            const failure = await new Promise(resolve => {
                this.lock.writeLock(key, async (release) => {
                    try {
                        const writePromise = await this.writeFile(pathKey, value);
                        release();
                        resolve(writePromise);
                    }
                    catch (e) {
                        release();
                        resolve(true);
                    }
                });
            });
            return !failure;
        };
        this.getPathKey = (key) => {
            return path_1.join(this.cachePath, key);
        };
        this.deleteFile = async (key) => {
            const pathKey = this.getPathKey(key);
            this.keyToBeDeleted = '';
            const failure = new Promise(resolve => {
                this.lock.writeLock(key, async (release) => {
                    try {
                        const removePromise = await fs_extra_1.remove(pathKey);
                        release();
                        resolve(removePromise);
                    }
                    catch (e) {
                        release();
                        resolve(true);
                    }
                });
            });
            return !failure;
        };
        this.hits = 0;
        this.total = 0;
        this.disposed = 0;
        this.keyToBeDeleted = '';
        this.lock = new rwlock_1.default();
        const dispose = (key) => {
            this.keyToBeDeleted = key;
            this.disposed += 1;
        };
        const lruOptions = {
            ...options,
            dispose,
            noDisposeOnSet: true,
        };
        this.lruStorage = new lru_cache_1.default(lruOptions);
    }
}
exports.LRUDiskCache = LRUDiskCache;

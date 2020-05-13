"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const rwlock_1 = __importDefault(require("rwlock"));
class DiskCache {
    constructor(cachePath, readFile = fs_extra_1.readJSON, writeFile = fs_extra_1.outputJSON) {
        this.cachePath = cachePath;
        this.readFile = readFile;
        this.writeFile = writeFile;
        this.hits = 0;
        this.total = 0;
        this.has = (key) => {
            const pathKey = this.getPathKey(key);
            return fs_extra_1.pathExistsSync(pathKey);
        };
        this.getStats = (name = 'disk-cache') => {
            const stats = {
                hits: this.hits,
                name,
                total: this.total,
            };
            this.hits = 0;
            this.total = 0;
            return stats;
        };
        this.get = async (key) => {
            const pathKey = this.getPathKey(key);
            this.total += 1;
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
            return data;
        };
        this.set = async (key, value) => {
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
        this.getPathKey = (key) => path_1.join(this.cachePath, key);
        this.lock = new rwlock_1.default();
    }
}
exports.DiskCache = DiskCache;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const ramda_1 = require("ramda");
const semver = __importStar(require("semver"));
exports.getMetaInfoKey = (account, workspace) => `${account}-${workspace}-meta-infos`;
const hashMD5 = (text) => crypto_1.default
    .createHash('md5')
    .update(text)
    .digest('hex');
exports.updateMetaInfoCache = async (cacheStorage, account, workspace, dependencies, logger) => {
    if (workspace !== 'master') {
        return;
    }
    const key = exports.getMetaInfoKey(account, workspace);
    const hash = hashMD5(dependencies.toString());
    try {
        const storedDependencies = await cacheStorage.get(key) || '';
        if (hash !== hashMD5(storedDependencies.toString())) {
            await cacheStorage.set(key, dependencies);
        }
    }
    catch (error) {
        logger.error({ error, message: 'Apps disk cache update failed' });
    }
    return;
};
const getFallbackKey = (appName, major) => `${appName}@${major}`;
exports.saveVersion = async (app, cacheStorage) => {
    const [appName, version] = app.split('@');
    const major = ramda_1.head(version.split('.')) || '';
    const fallbackKey = getFallbackKey(appName, major);
    if (cacheStorage.has(fallbackKey)) {
        const savedVersion = await cacheStorage.get(fallbackKey);
        if (savedVersion && (version === `${major}.x` || semver.gt(version, savedVersion))) {
            await cacheStorage.set(fallbackKey, version);
        }
    }
    else {
        await cacheStorage.set(fallbackKey, version);
    }
};
exports.getFallbackFile = async (app, path, cacheStorage, apps) => {
    const [appName, version] = app.split('@');
    const major = ramda_1.head(version.split('.')) || '';
    const fallbackKey = getFallbackKey(appName, major);
    const fallbackVersion = await cacheStorage.get(fallbackKey);
    if (fallbackVersion) {
        const appFallbackVersion = `${appName}@${fallbackVersion}`;
        return apps.getAppFile(appFallbackVersion, path);
    }
    throw Error('Fallback version was not found');
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const archiver_1 = __importDefault(require("archiver"));
const tar_fs_1 = require("tar-fs");
const zlib_1 = require("zlib");
const HttpClient_1 = require("../../HttpClient");
const utils_1 = require("../../utils");
const appsStaleIfError_1 = require("../../utils/appsStaleIfError");
const InfraClient_1 = require("./InfraClient");
const createRoutes = ({ account, workspace }) => {
    const routes = {
        Acknowledge: (app, service) => `${routes.App(app)}/acknowledge/${service}`,
        App: (app) => `${routes.Apps()}/${app}`,
        AppBundle: (locator, path) => `${routes.AppOrRegistry(locator)}/bundle/${path}`,
        AppOrRegistry: ({ name, version, build }) => build
            ? `${routes.Apps()}/${name}@${version}+${build}`
            : `${routes.Registry()}/${name}/${version}`,
        Apps: () => `${routes.Workspace}/apps`,
        Dependencies: () => `${routes.Workspace}/dependencies`,
        File: (locator, path) => `${routes.Files(locator)}/${path}`,
        FileFromApps: (app, path) => `${routes.Workspace}/apps/${app}/files/${path}`,
        Files: (locator) => `${routes.AppOrRegistry(locator)}/files`,
        Link: (app) => `${routes.Workspace}/v2/links/${app}`,
        Links: () => `${routes.Workspace}/links`,
        Master: `/${account}/master`,
        Meta: () => `${routes.Workspace}/v2/apps`,
        Registry: () => `${routes.Master}/registry`,
        ResolveDependencies: () => `${routes.Workspace}/dependencies/_resolve`,
        ResolveDependenciesWithManifest: () => `${routes.Workspace}/v2/apps/_resolve`,
        Settings: (app) => `${routes.App(app)}/settings`,
        Unlink: (app) => `${routes.Links()}/${app}`,
        Workspace: `/${account}/${workspace}`,
    };
    return routes;
};
const getVendorAndName = ({ id }) => utils_1.removeVersionFromAppId(id);
const notFound = (e) => {
    if (e.response && e.response.status === 404) {
        return {};
    }
    throw e;
};
const zipObj = (keys, values) => {
    let idx = 0;
    const len = Math.min(keys.length, values.length);
    const out = {};
    while (idx < len) {
        out[keys[idx]] = values[idx];
        idx += 1;
    }
    return out;
};
// 🚨🚨🚨
// In order to make changes in here, please also change the colossus App so we
// share the same cache key and do NOT call Apps unecessarily
const workspaceFields = [
    '_activationDate',
    '_buildFeatures',
    '_isRoot',
    '_resolvedDependencies',
    'credentialType',
    'link',
    'name',
    'registry',
    'settingsSchema',
    'vendor',
    'version',
].join(',');
class Apps extends InfraClient_1.InfraClient {
    constructor(context, options) {
        super('apps@0.x', context, options, true);
        this.installApp = (descriptor, tracingConfig) => {
            if (descriptor.startsWith('infra:service-')) {
                return this.installRuntime(descriptor, tracingConfig);
            }
            const metric = 'apps-install';
            return this.http.post(this.routes.Apps(), { id: descriptor }, {
                metric,
                tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                },
            });
        };
        this.uninstallApp = (app, tracingConfig) => {
            const metric = 'apps-uninstall';
            return this.http.delete(this.routes.App(app), {
                metric,
                tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                },
            });
        };
        this.acknowledgeApp = (app, service, tracingConfig) => {
            const metric = 'apps-ack';
            return this.http.put(this.routes.Acknowledge(app, service), null, {
                metric,
                tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                },
            });
        };
        this.link = async (app, files, { zlib } = {}, tracingConfig) => {
            if (!(files[0] && files[0].path)) {
                throw new Error('Argument files must be an array of {path, content}, where content can be a String, a Buffer or a ReadableStream.');
            }
            const emptyChanges = files.filter(file => !file.content);
            if (emptyChanges.length > 0) {
                throw new Error(`Missing content for paths: ${emptyChanges.map(e => e.path).join('; ')}`);
            }
            const indexOfManifest = files.findIndex(({ path }) => path === 'manifest.json');
            if (indexOfManifest === -1) {
                throw new Error('No manifest.json file found in files.');
            }
            const zip = archiver_1.default('zip', { zlib });
            // Throw stream errors so they reject the promise chain.
            zip.on('error', (e) => {
                throw e;
            });
            const metric = 'apps-link';
            const request = this.http.put(this.routes.Link(app), zip, {
                headers: { 'Content-Type': 'application/zip' },
                metric,
                tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                },
            });
            files.forEach(({ content, path }) => zip.append(content, { name: path }));
            const finalize = zip.finalize();
            try {
                const [response] = await Promise.all([request, finalize]);
                response.bundleSize = zip.pointer();
                return response;
            }
            catch (e) {
                e.bundleSize = zip.pointer();
                throw e;
            }
        };
        this.patch = async (app, changes, { zlib } = {}, tracingConfig) => {
            if (!(changes[0] && changes[0].path)) {
                throw new Error('Argument changes must be an array of {path, content}, where content can be a String, a Buffer or a ReadableStream.');
            }
            const files = changes.filter(change => !!change.content);
            const deletedFiles = changes
                .filter(change => !change.content)
                .map(change => change.path)
                .join(':');
            const zip = archiver_1.default('zip', { zlib });
            // Throw stream errors so they reject the promise chain.
            zip.on('error', (e) => {
                throw e;
            });
            const metric = 'apps-patch';
            const request = this.http.patch(this.routes.Link(app), zip, {
                headers: { 'Content-Type': 'application/zip' },
                metric,
                params: { deletedFiles },
                tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                },
            });
            files.forEach(({ content, path }) => zip.append(content, { name: path }));
            const finalize = zip.finalize();
            const [response] = await Promise.all([request, finalize]);
            return response;
        };
        this.unlink = (app, tracingConfig) => {
            return this.http.delete(this.routes.Unlink(app), {
                tracing: {
                    requestSpanNameSuffix: 'apps-unlink',
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                },
            });
        };
        this.unlinkAll = (tracingConfig) => {
            return this.http.delete(this.routes.Links(), {
                tracing: {
                    requestSpanNameSuffix: 'apps-unlink-all',
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                },
            });
        };
        this.saveAppSettings = (app, settings, tracingConfig) => {
            const headers = { 'Content-Type': 'application/json' };
            const metric = 'apps-save';
            return this.http.put(this.routes.Settings(app), settings, {
                headers,
                metric,
                tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                },
            });
        };
        this.listApps = ({ oldVersion, since, service } = {}, tracingConfig) => {
            const params = {
                oldVersion,
                service,
                since,
            };
            const metric = 'apps-list';
            const inflightKey = HttpClient_1.inflightUrlWithQuery;
            return this.http.get(this.routes.Apps(), {
                inflightKey,
                metric,
                params,
                tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                },
            });
        };
        this.listAppFiles = (app, { prefix, nextMarker } = {}, tracingConfig) => {
            const locator = utils_1.parseAppId(app);
            const linked = !!locator.build;
            const params = {
                marker: nextMarker,
                prefix,
            };
            const metric = linked ? 'apps-list-files' : 'registry-list-files';
            const inflightKey = HttpClient_1.inflightUrlWithQuery;
            return this.http.get(this.routes.Files(locator), {
                inflightKey,
                metric,
                params,
                tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                },
            });
        };
        this.listLinks = (tracingConfig) => {
            const inflightKey = HttpClient_1.inflightURL;
            const metric = 'apps-list-links';
            return this.http.get(this.routes.Links(), {
                inflightKey,
                metric,
                tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                },
            });
        };
        this.getAppFile = (app, path, staleIfError, tracingConfig) => {
            const { logger } = this.context;
            const locator = utils_1.parseAppId(app);
            const linked = !!locator.build;
            const inflightKey = HttpClient_1.inflightURL;
            if (staleIfError && this.memoryCache) {
                appsStaleIfError_1.saveVersion(app, this.memoryCache);
            }
            const metric = linked ? 'apps-get-file' : 'registry-get-file';
            try {
                return this.http.getBuffer(this.routes.File(locator, path), {
                    cacheable: linked ? HttpClient_1.CacheType.Memory : HttpClient_1.CacheType.Disk,
                    inflightKey,
                    metric,
                    tracing: {
                        requestSpanNameSuffix: metric,
                        ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                    },
                });
            }
            catch (error) {
                logger.error({ error, message: 'getAppFile failed', app, path });
                if (staleIfError && this.memoryCache) {
                    return appsStaleIfError_1.getFallbackFile(app, path, this.memoryCache, this);
                }
                throw error;
            }
        };
        this.getAppJSON = (app, path, nullIfNotFound, tracingConfig) => {
            const locator = utils_1.parseAppId(app);
            const linked = !!locator.build;
            const inflightKey = HttpClient_1.inflightURL;
            const metric = linked ? 'apps-get-json' : 'registry-get-json';
            return this.http.get(this.routes.File(locator, path), {
                cacheable: linked ? HttpClient_1.CacheType.Memory : HttpClient_1.CacheType.Any,
                inflightKey,
                metric,
                nullIfNotFound,
                tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                },
            });
        };
        this.getFileFromApps = (app, path, nullIfNotFound, tracingConfig) => {
            const inflightKey = HttpClient_1.inflightURL;
            const metric = 'get-file-from-apps';
            return this.http.get(this.routes.FileFromApps(app, path), {
                cacheable: HttpClient_1.CacheType.Memory,
                inflightKey,
                metric,
                nullIfNotFound,
                tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                },
            });
        };
        this.getAppFileStream = (app, path, tracingConfig) => {
            const locator = utils_1.parseAppId(app);
            const metric = locator.build ? 'apps-get-file-s' : 'registry-get-file-s';
            return this.http.getStream(this.routes.File(locator, path), {
                metric,
                tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                },
            });
        };
        this.getApp = (app, tracingConfig) => {
            const metric = 'apps-get-app';
            const inflightKey = HttpClient_1.inflightURL;
            return this.http.get(this.routes.App(app), {
                inflightKey,
                metric,
                tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                },
            });
        };
        this.getAppSettings = (app, tracingConfig) => {
            const inflightKey = HttpClient_1.inflightURL;
            const metric = 'apps-get-settings';
            return this.http.get(this.routes.Settings(app), {
                inflightKey,
                metric,
                tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                },
            });
        };
        this.getAllAppsSettings = (listAppsOptions = {}, tracingConfig) => {
            return this.listApps(listAppsOptions, tracingConfig).then(({ data: installedApps }) => {
                const names = installedApps.map(getVendorAndName);
                const settingsPromises = names.map(vendorAndName => this.getAppSettings(vendorAndName, tracingConfig).catch(notFound));
                return Promise.all(settingsPromises).then((settings) => {
                    return zipObj(names, settings);
                });
            });
        };
        this.getAppBundle = (app, bundlePath, generatePackageJson, tracingConfig) => {
            const locator = utils_1.parseAppId(app);
            const params = generatePackageJson && { _packageJSONEngine: 'npm', _packageJSONFilter: 'vtex.render-builder@x' };
            const metric = locator.build ? 'apps-get-bundle' : 'registry-get-bundle';
            return this.http.getStream(this.routes.AppBundle(locator, bundlePath), {
                headers: {
                    Accept: 'application/x-gzip',
                    'Accept-Encoding': 'gzip',
                },
                metric,
                params,
                tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                },
            });
        };
        this.unpackAppBundle = (app, bundlePath, unpackPath, generatePackageJson, tracingConfig) => {
            return this.getAppBundle(app, bundlePath, generatePackageJson, tracingConfig)
                .then(stream => stream
                .pipe(zlib_1.createGunzip())
                .pipe(tar_fs_1.extract(unpackPath)));
        };
        this.getAppsMetaInfos = async (filter, staleWhileRevalidate = true, tracingConfig) => {
            var _a;
            const { account, production, recorder, workspace, logger } = this.context;
            const metric = 'get-apps-meta';
            const inflightKey = HttpClient_1.inflightURL;
            const key = appsStaleIfError_1.getMetaInfoKey(account, workspace);
            const cachedResponse = production && staleWhileRevalidate
                ? await ((_a = this.diskCache) === null || _a === void 0 ? void 0 : _a.get(key))
                : undefined;
            if (cachedResponse && recorder) {
                recorder.record(cachedResponse.headers);
            }
            const metaInfoPromise = this.http
                .getRaw(this.routes.Meta(), {
                ignoreRecorder: Boolean(cachedResponse),
                inflightKey,
                metric,
                params: { fields: workspaceFields },
                tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                },
            })
                .then(response => {
                const { data, headers: responseHeaders } = response;
                if (this.diskCache && production) {
                    this.diskCache.set(key, {
                        appsMetaInfo: data.apps || [],
                        headers: responseHeaders,
                    });
                }
                return response;
            });
            let appsMetaInfo;
            if (cachedResponse) {
                appsMetaInfo = cachedResponse.appsMetaInfo;
                metaInfoPromise.catch(error => {
                    logger.warn({ message: 'Unable to update stale cache', error });
                });
            }
            else {
                appsMetaInfo = await metaInfoPromise.then(response => response.data.apps);
            }
            if (filter) {
                return appsMetaInfo.filter(appMeta => { var _a; return (_a = appMeta === null || appMeta === void 0 ? void 0 : appMeta._resolvedDependencies) === null || _a === void 0 ? void 0 : _a.filter; });
            }
            return appsMetaInfo;
        };
        this.getDependencies = (filter = '', tracingConfig) => {
            const params = { filter };
            const metric = 'apps-get-deps';
            const inflightKey = HttpClient_1.inflightUrlWithQuery;
            return this.http.get(this.routes.Dependencies(), {
                inflightKey,
                metric,
                params,
                tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                },
            });
        };
        this.updateDependencies = (tracingConfig) => {
            const metric = 'apps-update-deps';
            return this.http.put(this.routes.Dependencies(), null, {
                metric,
                tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                },
            });
        };
        this.updateDependency = (name, version, registry, tracingConfig) => {
            const metric = 'apps-update-dep';
            return this.http.patch(this.routes.Apps(), [{ name, version, registry }], {
                metric,
                tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                },
            });
        };
        this.resolveDependencies = (apps, registries, filter = '', tracingConfig) => {
            const params = { apps, registries, filter };
            const metric = 'apps-resolve-deps';
            const inflightKey = HttpClient_1.inflightUrlWithQuery;
            return this.http.get(this.routes.ResolveDependencies(), {
                inflightKey,
                metric,
                params,
                tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                },
            });
        };
        this.resolveDependenciesWithManifest = (manifest, filter = '', tracingConfig) => {
            const params = { filter };
            const metric = 'apps-resolve-deps-m';
            return this.http.post(this.routes.ResolveDependenciesWithManifest(), manifest, {
                metric,
                params,
                tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                },
            });
        };
        this.installRuntime = (descriptor, tracingConfig) => {
            const { account, workspace } = this.context;
            const [name, version] = descriptor.split('@');
            return this.http.patch(`http://apps.aws-us-east-1.vtex.io/${account}/${workspace}/apps`, [
                {
                    name,
                    version,
                },
            ], {
                tracing: {
                    requestSpanNameSuffix: 'apps-install-runtime',
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                },
            });
        };
        this.diskCache = options && options.diskCache;
        this.memoryCache = options && options.memoryCache;
        this._routes = createRoutes(context);
    }
    get routes() {
        return this._routes;
    }
}
exports.Apps = Apps;

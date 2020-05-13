"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const archiver_1 = __importDefault(require("archiver"));
const tar_fs_1 = require("tar-fs");
const zlib_1 = require("zlib");
const constants_1 = require("../../constants");
const HttpClient_1 = require("../../HttpClient");
const InfraClient_1 = require("./InfraClient");
const EMPTY_OBJECT = {};
const routes = {
    App: (app) => `${routes.Registry}/${app}`,
    AppBundle: (app, version, path) => {
        return path ? `${routes.AppVersion(app, version)}/bundle/${path}` : `${routes.AppVersion(app, version)}/bundle`;
    },
    AppFile: (app, version, path) => `${routes.AppFiles(app, version)}/${path}`,
    AppFiles: (app, version) => `${routes.AppVersion(app, version)}/files`,
    AppVersion: (app, version) => `${routes.App(app)}/${version}`,
    Publish: '/v2/registry',
    PublishRc: '/v2/registry/rc',
    Registry: '/registry',
    ResolveDependenciesWithManifest: '/v2/registry/_resolve',
};
class Registry extends InfraClient_1.InfraClient {
    constructor(context, options) {
        super('apps@0.x', { ...context, workspace: constants_1.DEFAULT_WORKSPACE }, options);
        this.publishApp = (files, tag, { zlib } = {}, tracingConfig) => {
            return this.publish(routes.Publish, files, tag, { zlib }, tracingConfig);
        };
        this.publishAppRc = (files, tag, { zlib } = {}, tracingConfig) => {
            return this.publish(routes.PublishRc, files, tag, { zlib }, tracingConfig);
        };
        this.listApps = (tracingConfig) => {
            const inflightKey = HttpClient_1.inflightURL;
            const metric = 'registry-list';
            return this.http.get(routes.Registry, { inflightKey, metric, tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                } });
        };
        this.listVersionsByApp = (app, tracingConfig) => {
            const inflightKey = HttpClient_1.inflightURL;
            const metric = 'registry-list-versions';
            return this.http.get(routes.App(app), { inflightKey, metric, tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                } });
        };
        this.deprecateApp = (app, version, tracingConfig) => {
            const metric = 'registry-deprecate';
            return this.http.patch(routes.AppVersion(app, version), { patchState: 'deprecate' }, { metric, tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                } });
        };
        this.undeprecateApp = (app, version, tracingConfig) => {
            const metric = 'registry-undeprecate';
            return this.http.patch(routes.AppVersion(app, version), { patchState: 'undeprecate' }, { metric, tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                } });
        };
        this.validateApp = (app, version, tracingConfig) => {
            const metric = 'registry-validate';
            return this.http.patch(routes.AppVersion(app, version), { patchState: 'validate' }, { metric, tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                } });
        };
        this.getAppManifest = (app, version, opts, tracingConfig) => {
            const inflightKey = HttpClient_1.inflightUrlWithQuery;
            const params = opts;
            const metric = 'registry-manifest';
            return this.http.get(routes.AppVersion(app, version), { inflightKey, metric, params, tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                } });
        };
        this.listAppFiles = (app, version, opts, tracingConfig) => {
            const inflightKey = HttpClient_1.inflightUrlWithQuery;
            const params = opts;
            const metric = 'registry-list-files';
            return this.http.get(routes.AppFiles(app, version), { inflightKey, metric, params, tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                } });
        };
        this.getAppFile = (app, version, path, tracingConfig) => {
            const inflightKey = HttpClient_1.inflightURL;
            const metric = 'registry-get-file';
            return this.http.getBuffer(routes.AppFile(app, version, path), {
                cacheable: HttpClient_1.CacheType.Disk,
                inflightKey,
                metric,
                tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                },
            });
        };
        this.getAppJSON = (app, version, path, nullIfNotFound, tracingConfig) => {
            const inflightKey = HttpClient_1.inflightURL;
            const metric = 'registry-get-json';
            return this.http.get(routes.AppFile(app, version, path), {
                cacheable: HttpClient_1.CacheType.Any,
                inflightKey,
                metric,
                nullIfNotFound,
                tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                },
            });
        };
        this.getAppFileStream = (app, version, path, tracingConfig) => {
            const metric = 'registry-get-file-s';
            return this.http.getStream(routes.AppFile(app, version, path), {
                metric,
                tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                },
            });
        };
        this.getAppBundle = (app, version, bundlePath, generatePackageJson, tracingConfig) => {
            const params = generatePackageJson && { _packageJSONEngine: 'npm', _packageJSONFilter: 'vtex.render-builder@x' };
            const metric = 'registry-get-bundle';
            return this.http.getStream(routes.AppBundle(app, version, bundlePath), {
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
        this.unpackAppBundle = (app, version, bundlePath, unpackPath, generatePackageJson, tracingConfig) => {
            return this.getAppBundle(app, version, bundlePath, generatePackageJson, tracingConfig)
                .then(stream => stream
                .pipe(zlib_1.createGunzip())
                .pipe(tar_fs_1.extract(unpackPath)));
        };
        this.resolveDependenciesWithManifest = (manifest, filter = '', tracingConfig) => {
            const params = { filter };
            const metric = 'registry-resolve-deps';
            return this.http.post(routes.ResolveDependenciesWithManifest, manifest, { metric, params, tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                } });
        };
        this.publish = async (route, files, tag, { zlib } = {}, tracingConfig) => {
            if (!(files[0] && files[0].path && files[0].content)) {
                throw new Error('Argument files must be an array of {path, content}, where content can be a String, a Buffer or a ReadableStream.');
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
            const metric = 'registry-publish';
            const request = this.http.post(route, zip, {
                headers: { 'Content-Type': 'application/zip' },
                metric,
                params: tag ? { tag } : EMPTY_OBJECT,
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
    }
}
exports.Registry = Registry;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const archiver_1 = __importDefault(require("archiver"));
const cache_1 = require("../../HttpClient/middlewares/cache");
const AppClient_1 = require("./AppClient");
const routes = {
    Availability: (app) => `${routes.Builder}/availability/${app}`,
    Builder: '/_v/builder/0',
    Clean: (app) => `${routes.Builder}/clean/${app}`,
    Link: (app) => `${routes.Builder}/link/${app}`,
    PinnedDependencies: () => `${routes.Builder}/pinneddeps`,
    Publish: (app) => `${routes.Builder}/publish/${app}`,
    Relink: (app) => `${routes.Builder}/relink/${app}`,
    Test: (app) => `${routes.Builder}/test/${app}`,
};
class Builder extends AppClient_1.AppClient {
    constructor(ioContext, opts) {
        super('vtex.builder-hub@0.x', ioContext, opts);
        this.availability = async (app, hintIndex, tracingConfig) => {
            const stickyHint = hintIndex === undefined || hintIndex === null ?
                `request:${this.context.account}:${this.context.workspace}:${app}` :
                `request:${this.context.account}:${this.context.workspace}:${app}:${hintIndex}`;
            const headers = {
                'Content-Type': 'application/json',
                'x-vtex-sticky-host': stickyHint,
            };
            const metric = 'bh-availability';
            const { data: { availability }, headers: { 'x-vtex-sticky-host': host }, } = await this.http.getRaw(routes.Availability(app), { cacheable: cache_1.CacheType.None, headers, metric, tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                } });
            const { hostname, score } = availability;
            return { host, hostname, score };
        };
        this.clean = (app, tracingConfig) => {
            const headers = {
                'Content-Type': 'application/json',
                ...this.stickyHost && { 'x-vtex-sticky-host': this.stickyHost },
            };
            const metric = 'bh-clean';
            return this.http.post(routes.Clean(app), { headers, metric, tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                } });
        };
        this.getPinnedDependencies = (tracingConfig) => {
            return this.http.get(routes.PinnedDependencies(), {
                tracing: {
                    requestSpanNameSuffix: 'pinned-dependencies',
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                },
            });
        };
        this.linkApp = (app, files, zipOptions = { sticky: true }, params = {}, tracingConfig) => {
            return this.zipAndSend(routes.Link(app), app, files, zipOptions, params, tracingConfig);
        };
        this.publishApp = (app, files, zipOptions = { sticky: true }, params = {}, tracingConfig) => {
            return this.zipAndSend(routes.Publish(app), app, files, zipOptions, params, tracingConfig);
        };
        this.relinkApp = (app, changes, params = {}, tracingConfig) => {
            const headers = {
                'Content-Type': 'application/json',
                ...this.stickyHost && { 'x-vtex-sticky-host': this.stickyHost },
            };
            const metric = 'bh-relink';
            return this.http.put(routes.Relink(app), changes, { headers, metric, params, tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                } });
        };
        this.testApp = (app, files, zipOptions = { sticky: true }, params = {}, tracingConfig) => {
            return this.zipAndSend(routes.Test(app), app, files, zipOptions, params, tracingConfig);
        };
        this.zipAndSend = async (route, app, files, { tag, sticky, stickyHint, zlib } = {}, requestParams = {}, tracingConfig) => {
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
            const hint = stickyHint || `request:${this.context.account}:${this.context.workspace}:${app}`;
            const metric = 'bh-zip-send';
            const params = tag ? { ...requestParams, tag } : requestParams;
            const request = this.http.postRaw(route, zip, {
                headers: {
                    'Content-Type': 'application/octet-stream',
                    ...sticky && { 'x-vtex-sticky-host': this.stickyHost || hint },
                },
                metric,
                params,
                tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                },
            });
            files.forEach(({ content, path }) => zip.append(content, { name: path }));
            const finalize = zip.finalize();
            const [response] = await Promise.all([request, finalize]);
            const { data, headers: { 'x-vtex-sticky-host': host } } = response;
            this.stickyHost = host;
            return data;
        };
    }
}
exports.Builder = Builder;

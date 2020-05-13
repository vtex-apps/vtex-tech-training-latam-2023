"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
const HttpClient_1 = require("../../HttpClient");
const utils_1 = require("../../utils");
const InfraClient_1 = require("./InfraClient");
const dependsOnApp = (appsAtMajor) => (a) => {
    let dependsOn = false;
    appsAtMajor.forEach(appAtMajor => {
        const [name, major] = appAtMajor.split('@');
        const sanitizedMajor = major.includes('.') ? major.split('.')[0] : major;
        const version = a._resolvedDependencies[name];
        if (version) {
            const [depMajor] = version.split('.');
            if (sanitizedMajor === depMajor) {
                dependsOn = true;
            }
        }
    });
    return dependsOn;
};
const useBuildJson = (app, appVendorName) => {
    const buildFeatures = app._buildFeatures;
    return buildFeatures && buildFeatures[appVendorName] && ramda_1.contains('build.json', buildFeatures[appVendorName]);
};
const appOrRegistry = (workspace, { name, version, build }) => build
    ? `${workspace}/apps/${name}@${version}+${build}`
    : `master/registry/${name}/${version}`;
const createRoutes = (workspace) => ({
    Bundle: (scope, locator, path) => `/${scope}/${appOrRegistry(workspace, locator)}/bundle/${path}`,
    Files: (scope, locator, path) => `/${scope}/${appOrRegistry(workspace, locator)}/files/${path}`,
});
class Assets extends InfraClient_1.InfraClient {
    constructor(context, options) {
        super('apps@0.x', context, options, true);
        this.getAppBundleByVendor = (app, bundlePath, generatePackageJson, tracingConfig) => {
            const locator = utils_1.parseAppId(app);
            const params = generatePackageJson && { _packageJSONEngine: 'npm', _packageJSONFilter: 'vtex.render-builder@x' };
            const metric = locator.build ? 'apps-get-bundle' : 'registry-get-bundle';
            return this.http.getStream(this.routes.Bundle(this.context.account, locator, bundlePath), {
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
        this.getAppJSONByAccount = (app, path, nullIfNotFound, tracingConfig) => {
            const locator = utils_1.parseAppId(app);
            const inflightKey = HttpClient_1.inflightURL;
            const metric = 'assets-get-json-by-account';
            return this.http.get(this.routes.Files(this.context.account, locator, path), {
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
        this.getAppJSONByVendor = (app, path, nullIfNotFound, tracingConfig) => {
            const locator = utils_1.parseAppId(app);
            const vendor = locator.name.split('.')[0];
            const inflightKey = HttpClient_1.inflightURL;
            const metric = 'assets-get-json-by-vendor';
            return this.http.get(this.routes.Files(vendor, locator, path), {
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
        this.getAppFileByAccount = (app, path, nullIfNotFound, tracingConfig) => {
            const locator = utils_1.parseAppId(app);
            const inflightKey = HttpClient_1.inflightURL;
            const metric = 'assets-get-file-by-account';
            return this.http.getBuffer(this.routes.Files(this.context.account, locator, path), {
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
        this.getAppFileByVendor = (app, path, nullIfNotFound, tracingConfig) => {
            const locator = utils_1.parseAppId(app);
            const vendor = locator.name.split('.')[0];
            const inflightKey = HttpClient_1.inflightURL;
            const metric = 'assets-get-file-by-vendor';
            return this.http.getBuffer(this.routes.Files(vendor, locator, path), {
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
        this.routes = createRoutes(this.context.workspace);
    }
    getSettings(dependencies, appAtMajor, params = {}, tracingConfig) {
        const { pick, files } = params;
        const filtered = this.getFilteredDependencies(appAtMajor, dependencies);
        return Promise.all(filtered.map(dependency => {
            const [appVendorName] = appAtMajor.split('@');
            const buildJson = useBuildJson(dependency, appVendorName);
            return buildJson
                ? this.getBuildJSONForApp(dependency, appVendorName, pick, tracingConfig)
                : this.getSettingsFromFilesForApp(dependency, files, tracingConfig);
        }));
    }
    async getBuildJSONForApp(app, appVendorName, pick = [], tracingConfig) {
        const pickArray = Array.isArray(pick) ? pick : [pick];
        const buildJson = await this.getJSON(app.id, `dist/${appVendorName}/build.json`, undefined, tracingConfig);
        const result = !ramda_1.isEmpty(pickArray) ? ramda_1.pick(pickArray, buildJson) : buildJson;
        result.declarer = app.id;
        return result;
    }
    async getSettingsFromFilesForApp(app, files = [], tracingConfig) {
        // If there's no support for build.json, then fetch individual files and zip them into an {[file]: content} object.
        const filesArray = Array.isArray(files) ? files : [files];
        const fetched = await Promise.all(filesArray.map(file => this.getJSON(app.id, file, true, tracingConfig)));
        const result = ramda_1.zipObj(filesArray, fetched);
        result.declarer = app.id;
        return result;
    }
    async getJSON(appId, file, nullIfNotFound, tracingConfig) {
        const locator = utils_1.parseAppId(appId);
        const linked = !!locator.build;
        if (linked) {
            return this.getAppJSONByAccount(appId, file, nullIfNotFound, tracingConfig);
        }
        return this.getAppJSONByVendor(appId, file, nullIfNotFound, tracingConfig);
    }
    async getFile(appId, file, nullIfNotFound, tracingConfig) {
        const locator = utils_1.parseAppId(appId);
        const linked = !!locator.build;
        if (linked) {
            return this.getAppFileByAccount(appId, file, nullIfNotFound, tracingConfig);
        }
        return this.getAppFileByVendor(appId, file, nullIfNotFound, tracingConfig);
    }
    getFilteredDependencies(apps, dependencies) {
        const appsAtMajor = typeof (apps) === 'string' ? [apps] : apps;
        const depends = dependsOnApp(appsAtMajor);
        return ramda_1.filter(depends, dependencies);
    }
}
exports.Assets = Assets;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
const HttpClient_1 = require("../../HttpClient");
const settings_1 = require("../../service/worker/runtime/http/middlewares/settings");
const app_1 = require("../../utils/app");
const AppClient_1 = require("./AppClient");
const LINKED_ROUTE = 'linked';
const containsLinks = ramda_1.any(app_1.isLinkedApp);
class Settings extends AppClient_1.AppClient {
    constructor(context, options) {
        super('vtex.settings-server@0.x', context, options);
    }
    getFilteredDependencies(appAtMajor, dependencies) {
        return settings_1.getFilteredDependencies(appAtMajor, dependencies);
    }
    getDependenciesHash(dependencies) {
        return settings_1.getDependenciesHash(dependencies);
    }
    async getSettings(dependencies, appAtMajor, params, tracingConfig) {
        const filtered = this.getFilteredDependencies(appAtMajor, dependencies);
        // Settings server exposes a smartCache-enabled route for when the workspace contains links.
        const lastSegment = containsLinks(filtered)
            ? LINKED_ROUTE
            : this.getDependenciesHash(filtered);
        const metric = 'settings-get';
        return this.http.get(`/settings/${appAtMajor}/${lastSegment}`, {
            inflightKey: HttpClient_1.inflightUrlWithQuery,
            metric,
            params,
            tracing: {
                requestSpanNameSuffix: metric,
                ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
            },
        });
    }
}
exports.Settings = Settings;

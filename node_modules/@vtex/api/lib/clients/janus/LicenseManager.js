"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const qs_1 = require("qs");
const JanusClient_1 = require("./JanusClient");
const TWO_MINUTES_S = 2 * 60;
const BASE_URL = '/api/license-manager';
const routes = {
    accountData: `${BASE_URL}/account`,
    resourceAccess: `${BASE_URL}/resources`,
    topbarData: `${BASE_URL}/site/pvt/newtopbar`,
};
const inflightKey = ({ baseURL, url, params }) => {
    return baseURL + url + qs_1.stringify(params, { arrayFormat: 'repeat', addQueryPrefix: true });
};
class LicenseManager extends JanusClient_1.JanusClient {
    getAccountData(VtexIdclientAutCookie, tracingConfig) {
        const metric = 'lm-account-data';
        return this.http.get(routes.accountData, {
            forceMaxAge: TWO_MINUTES_S,
            headers: {
                VtexIdclientAutCookie,
            },
            inflightKey,
            metric,
            tracing: {
                requestSpanNameSuffix: metric,
                ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
            },
        });
    }
    getTopbarData(VtexIdclientAutCookie, tracingConfig) {
        const metric = 'lm-topbar-data';
        return this.http.get(routes.topbarData, {
            headers: {
                VtexIdclientAutCookie,
            },
            metric,
            tracing: {
                requestSpanNameSuffix: metric,
                ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
            },
        });
    }
    canAccessResource(VtexIdclientAutCookie, resourceKey, tracingConfig) {
        const metric = 'lm-resource-access';
        return this.http.get(`${routes.resourceAccess}/${resourceKey}/access`, {
            headers: {
                VtexIdclientAutCookie,
            },
            metric,
            tracing: {
                requestSpanNameSuffix: metric,
                ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
            },
        }).then(() => true, () => false);
    }
}
exports.LicenseManager = LicenseManager;

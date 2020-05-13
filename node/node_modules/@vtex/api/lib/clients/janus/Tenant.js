"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpClient_1 = require("../../HttpClient");
const JanusClient_1 = require("./JanusClient");
class TenantClient extends JanusClient_1.JanusClient {
    constructor(ctx, opts) {
        super(ctx, {
            ...opts,
            params: {
                q: ctx.account,
            },
        });
        this.info = (config) => {
            const metric = 'get-tenant-info';
            return this.http.get('/api/tenant/tenants', {
                inflightKey: HttpClient_1.inflightUrlWithQuery,
                memoizeable: true,
                metric,
                ...config,
                tracing: {
                    requestSpanNameSuffix: metric,
                    ...config === null || config === void 0 ? void 0 : config.tracing,
                },
            });
        };
    }
}
exports.TenantClient = TenantClient;

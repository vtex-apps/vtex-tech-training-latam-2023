"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InfraClient_1 = require("./InfraClient");
const appId = process.env.VTEX_APP_ID;
const [runningAppName] = appId ? appId.split('@') : [''];
const routes = {
    Bucket: (bucket) => `/buckets/${runningAppName}/${bucket}`,
    Metadata: (bucket) => `${routes.Bucket(bucket)}/metadata`,
    MetadataKey: (bucket, key) => `${routes.Metadata(bucket)}/${key}`,
};
class Metadata extends InfraClient_1.InfraClient {
    constructor(context, options) {
        super('router', context, options);
        this.getBuckets = (bucket, tracingConfig) => {
            const metric = 'meta-get-buckets';
            return this.http.get(routes.Bucket(bucket), { metric, tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                } });
        };
        this.list = (bucket, includeValue, limit, nextMarker, tracingConfig) => {
            const query = { value: includeValue, _limit: 10 };
            if (limit && limit > 0) {
                query._limit = limit;
            }
            if (nextMarker) {
                query._marker = nextMarker;
            }
            const metric = 'meta-list';
            return this.http.get(routes.Metadata(bucket), { metric, params: query, tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                } });
        };
        this.listAll = (bucket, includeValue, tracingConfig) => {
            const query = { value: includeValue, _limit: 1000 };
            const metric = 'meta-list-all';
            return this.http.get(routes.Metadata(bucket), { metric, params: query, tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                } });
        };
        this.get = (bucket, key, tracingConfig) => {
            const metric = 'meta-get';
            return this.http.get(routes.MetadataKey(bucket, key), { metric, tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                } });
        };
        this.save = (bucket, key, data, tracingConfig) => {
            const metric = 'meta-save';
            return this.http.put(routes.MetadataKey(bucket, key), data, { metric, tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                } });
        };
        this.saveAll = (bucket, data, tracingConfig) => {
            const metric = 'meta-save-all';
            return this.http.put(routes.Metadata(bucket), data, { metric, tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                } });
        };
        this.delete = (bucket, key, tracingConfig) => {
            const metric = 'meta-delete';
            return this.http.delete(routes.MetadataKey(bucket, key), { metric, tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                } });
        };
        this.deleteAll = (bucket, tracingConfig) => {
            const metric = 'meta-delete-all';
            return this.http.delete(routes.Metadata(bucket), { metric, tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                } });
        };
        if (runningAppName === '') {
            throw new Error(`Invalid path to access Metadata. Variable VTEX_APP_ID is not available.`);
        }
    }
}
exports.Metadata = Metadata;

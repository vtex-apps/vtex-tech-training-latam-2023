"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const qs_1 = require("qs");
const inflight = new Map();
let metricsAdded = false;
exports.singleFlightMiddleware = async (ctx, next) => {
    const { inflightKey } = ctx.config;
    if (!inflightKey) {
        return await next();
    }
    // We cannot allow single flight requests to
    // cancel any request
    ctx.config.cancelToken = undefined;
    if (!metricsAdded) {
        metrics.addOnFlushMetric(() => ({
            name: 'node-vtex-api-inflight-map-size',
            size: inflight.entries.length,
        }));
        metricsAdded = true;
    }
    const key = inflightKey(ctx.config);
    const isInflight = !!inflight.has(key);
    if (isInflight) {
        const memoized = await inflight.get(key);
        ctx.inflightHit = isInflight;
        ctx.response = memoized.response;
        return;
    }
    else {
        const promise = new Promise(async (resolve, reject) => {
            try {
                await next();
                resolve({
                    cacheHit: ctx.cacheHit,
                    response: ctx.response,
                });
            }
            catch (err) {
                reject(err);
            }
            finally {
                inflight.delete(key);
            }
        });
        inflight.set(key, promise);
        await promise;
    }
};
exports.inflightURL = ({ baseURL, url }) => baseURL + url;
exports.inflightUrlWithQuery = ({ baseURL, url, params }) => baseURL + url + qs_1.stringify(params, { arrayFormat: 'repeat', addQueryPrefix: true });

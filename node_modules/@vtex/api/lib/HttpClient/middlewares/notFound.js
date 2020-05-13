"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const addNotFound = (validateStatus) => (status) => validateStatus(status) || status === 404;
function nullIfNotFound(config) {
    return config && config.nullIfNotFound;
}
exports.acceptNotFoundMiddleware = async (ctx, next) => {
    const { config } = ctx;
    if (nullIfNotFound(config)) {
        ctx.config.validateStatus = addNotFound(config.validateStatus);
    }
    await next();
};
exports.notFoundFallbackMiddleware = async (ctx, next) => {
    await next();
    const { config } = ctx;
    if (nullIfNotFound(config) && ctx.response && ctx.response.status === 404) {
        ctx.response.data = null;
    }
};

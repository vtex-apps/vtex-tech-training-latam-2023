"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
const compose_1 = require("./utils/compose");
const TEN_SECONDS_S = 10;
function methodNotAllowed(ctx) {
    ctx.status = 405;
    ctx.set('cache-control', `public, max-age=${TEN_SECONDS_S}`);
}
function method(options) {
    const handlers = ramda_1.mapObjIndexed(handler => compose_1.compose(Array.isArray(handler) ? handler : [handler]), options);
    const inner = async function forMethod(ctx, next) {
        const verb = ctx.method.toUpperCase();
        const handler = handlers[verb] || handlers.DEFAULT || methodNotAllowed;
        if (handler) {
            await handler(ctx);
        }
        await next();
    };
    inner.skipTimer = true;
    return inner;
}
exports.method = method;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const querystring_1 = require("querystring");
const constants_1 = require("../../../../../constants");
const context_1 = require("../../utils/context");
exports.createPvtContextMiddleware = (routeId, { smartcache }) => {
    return async function pvtContext(ctx, next) {
        const { params, request: { header }, } = ctx;
        ctx.vtex = {
            ...context_1.prepareHandlerCtx(header, ctx.tracing),
            ...(smartcache && { recorder: ctx.state.recorder }),
            route: {
                id: routeId,
                params,
                type: 'private',
            },
        };
        await next();
    };
};
exports.createPubContextMiddleware = (routeId, { smartcache }) => {
    return async function pubContext(ctx, next) {
        const { request: { header }, } = ctx;
        ctx.vtex = {
            ...context_1.prepareHandlerCtx(header, ctx.tracing),
            ...(smartcache && { recorder: ctx.state.recorder }),
            route: {
                declarer: header[constants_1.COLOSSUS_ROUTE_DECLARER_HEADER],
                id: routeId,
                params: querystring_1.parse(header[constants_1.COLOSSUS_PARAMS_HEADER]),
                type: 'public',
            },
        };
        await next();
    };
};

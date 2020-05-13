"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../../constants");
const logger_1 = require("../../../logger");
const console_1 = require("./../../../logger/console");
exports.routerFromPublicHttpHandlers = (routes) => {
    return async (ctx, next) => {
        var _a;
        const routeId = ctx.get(constants_1.COLOSSUS_ROUTE_ID_HEADER);
        if (!routeId) {
            return next();
        }
        const handler = (_a = routes[routeId]) === null || _a === void 0 ? void 0 : _a.handler;
        if (!handler) {
            const msg = `Handler with id '${routeId}' not implemented.`;
            ctx.status = 501;
            ctx.body = msg;
            console_1.logOnceToDevConsole(msg, logger_1.LogLevel.Error);
            return;
        }
        await handler(ctx, next);
    };
};

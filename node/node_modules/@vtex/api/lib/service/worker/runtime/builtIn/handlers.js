"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.whoAmIHandler = ({ events, routes, }) => (ctx) => {
    var _a;
    (_a = ctx.tracing) === null || _a === void 0 ? void 0 : _a.currentSpan.setOperationName('builtin:whoami');
    ctx.status = 200;
    ctx.body = {
        events,
        routes,
    };
    ctx.set('Cache-Control', 'public, max-age=86400'); // cache for 24 hours
};
exports.healthcheckHandler = ({ events, routes, }) => (ctx) => {
    var _a;
    (_a = ctx.tracing) === null || _a === void 0 ? void 0 : _a.currentSpan.setOperationName('builtin:healthcheck');
    ctx.status = 200;
    ctx.body = {
        events,
        routes,
    };
};
exports.metricsLoggerHandler = (ctx) => {
    var _a;
    (_a = ctx.tracing) === null || _a === void 0 ? void 0 : _a.currentSpan.setOperationName('builtin:metrics-logger');
    ctx.status = 200;
    ctx.body = ctx.metricsLogger.getSummaries();
};

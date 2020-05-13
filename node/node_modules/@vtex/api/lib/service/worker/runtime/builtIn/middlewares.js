"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prom_client_1 = require("prom-client");
const prometheus_gc_stats_1 = __importDefault(require("prometheus-gc-stats"));
const metricsLogger_1 = require("../../../logger/metricsLogger");
const recorder_1 = require("../utils/recorder");
async function recorderMiddleware(ctx, next) {
    const recorder = new recorder_1.Recorder();
    ctx.state.recorder = recorder;
    await next();
    recorder.flush(ctx);
    return;
}
exports.recorderMiddleware = recorderMiddleware;
exports.addMetricsLoggerMiddleware = () => {
    const metricsLogger = new metricsLogger_1.MetricsLogger();
    return (ctx, next) => {
        ctx.metricsLogger = metricsLogger;
        return next();
    };
};
exports.prometheusLoggerMiddleware = () => {
    const register = new prom_client_1.Registry();
    const gauge = new prom_client_1.Gauge({ name: 'io_http_requests_current', help: 'The current number of requests in course.' });
    register.registerMetric(gauge);
    prom_client_1.collectDefaultMetrics({ register });
    const startGcStats = prometheus_gc_stats_1.default(register);
    startGcStats();
    return async (ctx, next) => {
        var _a;
        if (ctx.request.path !== '/metrics') {
            gauge.inc(1);
            await next();
            gauge.dec(1);
            return;
        }
        (_a = ctx.tracing) === null || _a === void 0 ? void 0 : _a.currentSpan.setOperationName('builtin:prometheus-metrics');
        ctx.set('Content-Type', register.contentType);
        ctx.body = register.metrics();
        ctx.status = 200;
    };
};

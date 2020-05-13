"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
const logger_1 = require("../service/logger");
exports.hrToMillis = ([seconds, nanoseconds]) => Math.round((seconds * 1e3) + (nanoseconds / 1e6));
exports.hrToNano = ([seconds, nanoseconds]) => seconds * 1e9 + nanoseconds;
exports.formatNano = (nanoseconds) => `${(nanoseconds / 1e9).toFixed(0)}s ${((nanoseconds / 1e6) % 1e3).toFixed(0)}ms`;
exports.reduceHrToNano = ramda_1.reduce((acc, hr) => acc + exports.hrToNano(hr), 0);
exports.shrinkTimings = (name) => name.replace(/graphql/g, 'gql').replace(/server/g, 'srv');
exports.formatTimingName = ({ hopNumber, target, source }) => `${Number.isNaN(hopNumber) ? '' : hopNumber}.${source || ''}#${target || ''}`;
exports.parseTimingName = (timing) => {
    const [hopNumber, sourceAndTarget] = timing ? timing.split('.') : [null, null];
    const [source, target] = sourceAndTarget ? sourceAndTarget.split('#') : [null, null];
    return {
        hopNumber: Number.isNaN(hopNumber) ? null : Number(hopNumber),
        source,
        target,
    };
};
exports.reduceTimings = (timingsObj) => ramda_1.compose(ramda_1.reduce((acc, [key, dur]) => `${key};dur=${dur}, ${acc}`, ''), ramda_1.toPairs)(timingsObj);
function recordTimings(start, name, timings, middlewareMetrics, success) {
    // Capture the total amount of time spent in this middleware, which includes following middlewares
    const end = process.hrtime(start);
    // Elapsed for this middleware must disconsider total so far
    const elapsed = [
        end[0] - timings.total[0],
        end[1] - timings.total[1],
    ];
    // Only record successful executions
    if (success) {
        timings[name] = elapsed;
    }
    // This middlewares end is now the total
    timings.total = end;
    // Batch metric
    const label = `middleware-${name}`;
    metrics.batch(label, success ? elapsed : undefined, { success: success ? 1 : 0 });
    // This middleware has added it's own metrics
    // Just add them to `timings` scoped by the middleware's name and batch them
    const middlewareMetricsKeys = ramda_1.keys(middlewareMetrics);
    if (success && middlewareMetricsKeys.length > 0) {
        ramda_1.forEach((k) => {
            const metricEnd = middlewareMetrics[k];
            // Delete own metrics so next middleware can have empty state but still accumulate metrics batched after `await`
            delete middlewareMetrics[k];
            const metricName = `${label}-${k}`;
            timings[metricName] = metricEnd;
            metrics.batch(metricName, metricEnd);
        }, middlewareMetricsKeys);
    }
}
function timer(middleware) {
    if (middleware.skipTimer) {
        return middleware;
    }
    if (!middleware.name) {
        logger_1.logOnceToDevConsole(`Please use a named function as handler for better metrics. ${middleware.toString()}`, logger_1.LogLevel.Warn);
    }
    return async (ctx, next) => {
        if (!ctx.serverTiming) {
            ctx.serverTiming = {};
        }
        if (!ctx.timings) {
            ctx.timings = {
                total: [0, 0],
            };
        }
        if (!ctx.metrics) {
            ctx.metrics = {};
        }
        const start = process.hrtime();
        try {
            await middleware(ctx, next);
            // At this point, this middleware *and all following ones* have executed
            recordTimings(start, middleware.name, ctx.timings, ctx.metrics, true);
        }
        catch (e) {
            recordTimings(start, middleware.name, ctx.timings, ctx.metrics, false);
            throw e;
        }
    };
}
exports.timer = timer;
function timerForEvents(middleware) {
    if (middleware.skipTimer) {
        return middleware;
    }
    if (!middleware.name) {
        logger_1.logOnceToDevConsole(`Please use a named function as handler for better metrics. ${middleware.toString()}`, logger_1.LogLevel.Warn);
    }
    return async (ctx, next) => {
        if (!ctx.timings) {
            ctx.timings = {
                total: [0, 0],
            };
        }
        if (!ctx.metrics) {
            ctx.metrics = {};
        }
        const start = process.hrtime();
        try {
            await middleware(ctx, next);
            // At this point, this middleware *and all following ones* have executed
            recordTimings(start, middleware.name, ctx.timings, ctx.metrics, true);
        }
        catch (e) {
            recordTimings(start, middleware.name, ctx.timings, ctx.metrics, false);
            throw e;
        }
    };
}
exports.timerForEvents = timerForEvents;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const opentracing_1 = require("opentracing");
const TracerSingleton_1 = require("../service/tracing/TracerSingleton");
const utils_1 = require("./utils");
exports.createTracingContextFromCarrier = (newSpanName, carrier) => {
    const tracer = TracerSingleton_1.TracerSingleton.getTracer();
    const rootSpan = tracer.extract(opentracing_1.FORMAT_HTTP_HEADERS, carrier);
    if (rootSpan == null) {
        throw new Error('Missing span context data on carrier');
    }
    const span = tracer.startSpan(newSpanName, { childOf: rootSpan });
    const userlandTracer = new UserLandTracer(tracer, span);
    userlandTracer.lockFallbackSpan();
    return { span, tracer: userlandTracer };
};
class UserLandTracer {
    constructor(tracer, fallbackSpan) {
        this.tracer = tracer;
        this.fallbackSpan = fallbackSpan;
        this.fallbackSpanLock = false;
        const { traceId, isSampled } = utils_1.getTraceInfo(fallbackSpan);
        this._traceId = traceId;
        this._isSampled = isSampled;
    }
    get traceId() {
        return this._traceId;
    }
    get isTraceSampled() {
        return this._isSampled;
    }
    lockFallbackSpan() {
        this.fallbackSpanLock = true;
    }
    setFallbackSpan(newSpan) {
        if (this.fallbackSpanLock) {
            throw new Error(`FallbackSpan is locked, can't change it`);
        }
        this.fallbackSpan = newSpan;
    }
    startSpan(name, options) {
        var _a;
        if (options && (options.childOf || ((_a = options.references) === null || _a === void 0 ? void 0 : _a.length))) {
            return this.tracer.startSpan(name, options);
        }
        return this.tracer.startSpan(name, { ...options, childOf: this.fallbackSpan });
    }
    inject(spanContext, format, carrier) {
        return this.tracer.inject(spanContext, format, carrier);
    }
    fallbackSpanContext() {
        return this.fallbackSpan.context();
    }
}
exports.UserLandTracer = UserLandTracer;

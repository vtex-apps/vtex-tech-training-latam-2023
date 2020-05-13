"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getTraceInfo(span) {
    var _a, _b, _c;
    const spanContext = span.context();
    return {
        isSampled: (_c = (_b = (_a = spanContext).isSampled) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : false,
        traceId: spanContext.toTraceId(),
    };
}
exports.getTraceInfo = getTraceInfo;

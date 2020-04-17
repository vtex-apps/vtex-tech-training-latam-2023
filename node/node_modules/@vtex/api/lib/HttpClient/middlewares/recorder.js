"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recorderMiddleware = (recorder) => async (ctx, next) => {
    var _a;
    if ((_a = ctx.config) === null || _a === void 0 ? void 0 : _a.ignoreRecorder) {
        await next();
        return;
    }
    try {
        await next();
        if (ctx.response) {
            recorder.record(ctx.response.headers);
        }
    }
    catch (err) {
        if (err.response && err.response.headers && err.response.status === 404) {
            recorder.record(err.response.headers);
        }
        throw err;
    }
};

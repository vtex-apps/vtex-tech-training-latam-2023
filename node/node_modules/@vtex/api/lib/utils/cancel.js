"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function cancel(middleware) {
    return async (ctx, next) => {
        var _a, _b;
        if ((_b = (_a = ctx.vtex) === null || _a === void 0 ? void 0 : _a.cancellation) === null || _b === void 0 ? void 0 : _b.cancelled) {
            return;
        }
        await middleware(ctx, next);
    };
}
exports.cancel = cancel;

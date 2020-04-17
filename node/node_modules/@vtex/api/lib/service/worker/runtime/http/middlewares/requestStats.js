"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelMessage = 'Request cancelled';
class IncomingRequestStats {
    constructor() {
        this.aborted = 0;
        this.closed = 0;
        this.total = 0;
    }
    get() {
        return {
            aborted: this.aborted,
            closed: this.closed,
            total: this.total,
        };
    }
    clear() {
        this.aborted = 0;
        this.closed = 0;
        this.total = 0;
    }
}
exports.incomingRequestStats = new IncomingRequestStats();
const requestClosed = () => {
    exports.incomingRequestStats.closed++;
};
const requestAborted = (ctx) => () => {
    exports.incomingRequestStats.aborted++;
    if (ctx.vtex.cancellation && ctx.vtex.cancellation.cancelable) {
        ctx.vtex.cancellation.source.cancel(exports.cancelMessage);
        ctx.vtex.cancellation.cancelled = true;
    }
};
async function trackIncomingRequestStats(ctx, next) {
    ctx.req.on('close', requestClosed);
    ctx.req.on('aborted', requestAborted(ctx));
    exports.incomingRequestStats.total++;
    await next();
}
exports.trackIncomingRequestStats = trackIncomingRequestStats;

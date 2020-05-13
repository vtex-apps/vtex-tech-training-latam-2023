"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("../../constants");
const production = process.env.VTEX_PRODUCTION === 'true';
const handleCancellation = (ctx, cancellation) => {
    let cancellable = true;
    return {
        cancelToken: new axios_1.default.CancelToken((canceller) => {
            cancellation.source.token.promise.then(cancel => {
                if (cancellable) {
                    canceller(cancel.message);
                }
            });
        }),
        onRequestFinish: () => {
            if (!ctx.config.cancelToken) {
                // don't have cancelToken: not cancelable
                cancellable = false;
            }
            else if (!ctx.response) {
                // response is not ready: cancelable
                cancellable = true;
            }
            else if (ctx.config.responseType !== 'stream') {
                // response is ready and it is not a stream: not cancelable
                cancellable = false;
            }
            else if (ctx.response.data.readableEnded) {
                // response stream has ended: not cancelable
                cancellable = false;
            }
            else {
                // when response stream ends: not cancelable
                ctx.response.data.on('end', function streamEnded() {
                    cancellable = false;
                });
            }
        },
    };
};
exports.cancellationToken = (cancellation) => async (ctx, next) => {
    const { config: { method } } = ctx;
    if (!cancellation) {
        return await next();
    }
    if (method && !constants_1.cancellableMethods.has(method.toUpperCase())) {
        cancellation.cancelable = false;
    }
    if (!cancellation.cancelable || !cancellation.source) {
        return await next();
    }
    if (!cancellation.source.token.throwIfRequested) {
        if (!production) {
            throw new Error('Missing cancellation function. Are you trying to use HttpClient via workers threads?');
        }
        else {
            return await next();
        }
    }
    const { onRequestFinish, cancelToken } = handleCancellation(ctx, cancellation);
    ctx.config.cancelToken = cancelToken;
    try {
        await next();
    }
    finally {
        onRequestFinish();
    }
};

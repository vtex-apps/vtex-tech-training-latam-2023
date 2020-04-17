"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("../../../../../constants");
async function cancellationToken(ctx, next) {
    if (constants_1.cancellableMethods.has(ctx.method.toUpperCase())) {
        ctx.vtex.cancellation = {
            cancelable: true,
            cancelled: false,
            source: axios_1.default.CancelToken.source(),
        };
    }
    await next();
}
exports.cancellationToken = cancellationToken;

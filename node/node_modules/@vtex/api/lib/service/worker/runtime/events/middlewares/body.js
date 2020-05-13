"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const co_body_1 = __importDefault(require("co-body"));
const logger_1 = require("../../../../logger");
const console_1 = require("./../../../../logger/console");
async function parseBodyMiddleware(ctx, next) {
    try {
        ctx.state.body = await co_body_1.default(ctx.req);
    }
    catch (err) {
        const msg = `Error parsing event body: ${err.message || err}`;
        ctx.status = 500;
        ctx.body = msg;
        console_1.logOnceToDevConsole(msg, logger_1.LogLevel.Error);
        return;
    }
    await next();
}
exports.parseBodyMiddleware = parseBodyMiddleware;

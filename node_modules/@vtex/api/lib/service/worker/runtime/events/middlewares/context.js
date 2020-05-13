"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../../../constants");
const context_1 = require("../../utils/context");
async function eventContextMiddleware(ctx, next) {
    const { request: { header } } = ctx;
    ctx.vtex = {
        ...context_1.prepareHandlerCtx(header, ctx.tracing),
        eventInfo: {
            key: header[constants_1.EVENT_KEY_HEADER],
            sender: header[constants_1.EVENT_SENDER_HEADER],
            subject: header[constants_1.EVENT_SUBJECT_HEADER],
        },
        route: {
            id: header[constants_1.EVENT_HANDLER_ID_HEADER],
            params: {},
            type: 'event',
        },
    };
    await next();
}
exports.eventContextMiddleware = eventContextMiddleware;

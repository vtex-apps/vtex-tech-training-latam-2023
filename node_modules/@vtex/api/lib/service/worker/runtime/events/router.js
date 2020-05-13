"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../../constants");
const logger_1 = require("../../../logger");
const console_1 = require("./../../../logger/console");
exports.routerFromEventHandlers = (events) => {
    return async (ctx, next) => {
        const handlerId = ctx.get(constants_1.EVENT_HANDLER_ID_HEADER);
        if (!handlerId || !events) {
            return next();
        }
        if (handlerId == null) {
            ctx.response.status = 400;
            ctx.response.body = `Request header doesn't have the field x-event-handler-id`;
            return;
        }
        const handler = events[handlerId];
        if (!handler) {
            const msg = `Event handler not found for ${handlerId}`;
            ctx.response.status = 404;
            ctx.response.body = msg;
            console_1.logOnceToDevConsole(msg, logger_1.LogLevel.Error);
            return;
        }
        await handler(ctx, next);
    };
};

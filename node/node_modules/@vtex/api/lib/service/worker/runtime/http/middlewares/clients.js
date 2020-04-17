"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function clients(ClientsImpl, clientOptions) {
    return async function withClients(ctx, next) {
        if (ctx.serverTiming) {
            ctx.vtex.serverTiming = ctx.serverTiming;
        }
        ctx.clients = new ClientsImpl(clientOptions, ctx.vtex);
        await next();
    };
}
exports.clients = clients;

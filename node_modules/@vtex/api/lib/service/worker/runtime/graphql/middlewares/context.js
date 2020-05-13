"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../../../constants");
async function injectGraphqlContext(ctx, next) {
    ctx.graphql = {
        cacheControl: {
            maxAge: constants_1.MAX_AGE.LONG,
            noCache: false,
            noStore: false,
            scope: 'public',
        },
        status: 'success',
    };
    await next();
}
exports.injectGraphqlContext = injectGraphqlContext;

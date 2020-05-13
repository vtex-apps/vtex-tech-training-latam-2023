"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
const BLACKLISTED_COOKIES = new Set(['checkout.vtex.com']);
const warnMessage = (keys) => `Removing set-cookie from response since cache-control has as public scope.
This can be a huge security risk. Please remove either the public scope or set-cookie from your response.
Cookies dropped:

  ${keys.join('\n\t')}
`;
const findStr = (target, set) => ramda_1.find((a) => a.toLocaleLowerCase() === target, set);
const findScopeInCacheControl = (cacheControl) => {
    const splitted = cacheControl && cacheControl.split(/\s*,\s*/g);
    const scopePublic = splitted && findStr('public', splitted);
    return scopePublic;
};
const cookieKey = (cookie) => ramda_1.compose(ramda_1.head, ramda_1.split('='))(cookie);
const indexCookieByKeys = (setCookie) => ramda_1.map((cookie) => [cookieKey(cookie), cookie], setCookie);
async function removeSetCookie(ctx, next) {
    const { vtex: { logger } } = ctx;
    await next();
    const setCookie = ctx.response.headers['set-cookie'];
    if (!setCookie || ramda_1.isEmpty(setCookie)) {
        return;
    }
    const cacheControl = ctx.response.headers['cache-control'];
    const scope = findScopeInCacheControl(cacheControl);
    if (scope === 'public') {
        const indexedCookies = indexCookieByKeys(setCookie);
        const cookies = ramda_1.reduce((acc, [key, payload]) => {
            if (BLACKLISTED_COOKIES.has(key)) {
                acc.droppedKeys.push(key);
            }
            else {
                acc.addedPayload.push(payload);
            }
            return acc;
        }, {
            addedPayload: [],
            droppedKeys: [],
        }, indexedCookies);
        if (cookies.droppedKeys.length > 0) {
            ctx.set('set-cookie', cookies.addedPayload);
            console.warn(warnMessage(cookies.droppedKeys));
            logger.warn({
                cookieKeys: cookies.droppedKeys,
                message: 'Setting cookies in a public route!',
            });
        }
    }
}
exports.removeSetCookie = removeSetCookie;

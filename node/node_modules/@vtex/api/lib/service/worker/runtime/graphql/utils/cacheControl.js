"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../../../../../utils/domain");
const PRIVATE_ROUTE_REGEX = /_v\/graphql\/private\/v*/;
const linked = !!process.env.VTEX_APP_LINK;
const isPrivateRoute = ({ request: { headers } }) => PRIVATE_ROUTE_REGEX.test(headers['x-forwarded-path'] || '');
const publicRegExp = (endpoint) => new RegExp(`.*${endpoint.replace('.', '\\.')}.*`);
const isPublicEndpoint = ({ request: { headers } }) => {
    const host = headers['x-forwarded-host'];
    if (headers.origin || !host) {
        return false;
    }
    return domain_1.PUBLIC_DOMAINS.some(endpoint => publicRegExp(endpoint).test(host));
};
exports.cacheControlHTTP = (ctx) => {
    const { graphql: { cacheControl: { maxAge, scope: scopeHint, noCache: noCacheHint, noStore: noStoreHint, }, }, vtex: { production, }, } = ctx;
    const finalHeader = [];
    const noCache = noCacheHint || !production || isPublicEndpoint(ctx);
    if (noCache) {
        finalHeader.push('no-cache');
    }
    const noStore = noStoreHint || linked;
    if (noStore) {
        finalHeader.push('no-store');
    }
    if (!noCache && !noStore) {
        const scope = scopeHint === 'private' || isPrivateRoute(ctx) ? 'private' : 'public';
        finalHeader.push(scope);
        finalHeader.push(`max-age=${maxAge}`);
    }
    return finalHeader.join(',');
};

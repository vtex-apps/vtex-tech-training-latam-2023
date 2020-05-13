"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_errors_1 = require("apollo-server-errors");
const axios_1 = __importDefault(require("axios"));
const graphql_1 = require("graphql");
const graphql_tools_1 = require("graphql-tools");
async function getUserEmail(authToken, vtexIdToken) {
    const url = `vtexid.vtex.com.br/api/vtexid/pub/authenticated/user?authToken=${vtexIdToken}`;
    const req = await axios_1.default.request({
        headers: {
            'Accept': 'application/json',
            'Proxy-Authorization': authToken,
            'X-VTEX-Proxy-To': `https://${url}`,
        },
        method: 'get',
        url: `http://${url}`,
    });
    if (!req.data) {
        return undefined;
    }
    return req.data.user;
}
async function getUserCanAccessResource(authToken, account, userEmail, productCode, resourceCode) {
    const url = `http://${account}.vtexcommercestable.com.br/api/license-manager/pvt/accounts/${account}/products/${productCode}/logins/${userEmail}/resources/${resourceCode}/granted`;
    const req = await axios_1.default.request({
        headers: {
            'Authorization': authToken,
        },
        method: 'get',
        url,
    });
    return req.data;
}
async function auth(ctx, authArgs) {
    const vtexIdToken = ctx.cookies.get('VtexIdclientAutCookie') || ctx.get('VtexIdclientAutCookie');
    if (!vtexIdToken) {
        throw new apollo_server_errors_1.ForbiddenError('VtexIdclientAutCookie not found.');
    }
    const userEmail = await getUserEmail(ctx.vtex.authToken, vtexIdToken);
    if (!userEmail) {
        throw new apollo_server_errors_1.ForbiddenError('Could not find user specified by VtexIdclientAutCookie.');
    }
    const userCanAccessResource = await getUserCanAccessResource(ctx.vtex.authToken, ctx.vtex.account, userEmail, authArgs.productCode, authArgs.resourceCode);
    if (!userCanAccessResource) {
        throw new apollo_server_errors_1.ForbiddenError('User indicated by VtexIdclientAutCookie is not authorized to access the indicated resource.');
    }
}
function parseArgs(authArgs) {
    if (!authArgs.productCode || !authArgs.resourceCode) {
        throw new apollo_server_errors_1.UserInputError('Invalid auth schema directive args. Usage: @auth(productCode: String, resourceCode: String).');
    }
    return authArgs;
}
class Auth extends graphql_tools_1.SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        const { resolve = graphql_1.defaultFieldResolver } = field;
        field.resolve = async (root, args, ctx, info) => {
            const authArgs = parseArgs(this.args);
            await auth(ctx, authArgs);
            return resolve(root, args, ctx, info);
        };
    }
}
exports.Auth = Auth;
exports.authDirectiveTypeDefs = `
directive @auth(
  productCode: String
  resourceCode: String
) on FIELD_DEFINITION
`;

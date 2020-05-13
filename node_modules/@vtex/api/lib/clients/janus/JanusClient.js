"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExternalClient_1 = require("../external/ExternalClient");
/**
 * Used to perform calls on APIs in the VTEX Janus infrastructure, to which you must declare an outbound policy.
 *
 * Example policy:
 *
 * {
 *   "name": "outbound-access",
 *   "attrs": {
 *     "host": "portal.vtexcommercestable.com.br",
 *     "path": "/api/*"
 *   }
 * }
 */
class JanusClient extends ExternalClient_1.ExternalClient {
    constructor(context, options, environment) {
        const { account } = context;
        const env = context.janusEnv === 'beta' || environment === 'beta' ? 'beta' : 'stable';
        super(`http://portal.vtexcommerce${env}.com.br`, context, {
            ...options,
            params: {
                an: account,
                ...options === null || options === void 0 ? void 0 : options.params,
            },
        });
    }
}
exports.JanusClient = JanusClient;

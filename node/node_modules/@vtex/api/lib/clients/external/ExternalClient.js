"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IOClient_1 = require("../IOClient");
/**
 * Used to perform calls to external endpoints for which you have declared outbound access policies in your manifest.
 */
class ExternalClient extends IOClient_1.IOClient {
    constructor(baseURL, context, options) {
        const { authToken } = context;
        const headers = options && options.headers || {};
        super(context, {
            ...options,
            baseURL,
            headers: {
                ...headers,
                'Proxy-Authorization': authToken,
            },
        });
    }
}
exports.ExternalClient = ExternalClient;

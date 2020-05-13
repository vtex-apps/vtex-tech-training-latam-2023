"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExternalClient_1 = require("./ExternalClient");
const routes = {
    SEND: '/accesskey/send',
    START: '/start',
    VALIDATE: '/accesskey/validate',
    VALIDATE_CLASSIC: '/classic/validate',
};
const VTEXID_ENDPOINTS = {
    STABLE: 'https://vtexid.vtex.com.br/api/vtexid/pub/authentication',
};
const endpoint = (env) => {
    return VTEXID_ENDPOINTS[env] || env;
};
class ID extends ExternalClient_1.ExternalClient {
    constructor(context, opts) {
        super(endpoint(VTEXID_ENDPOINTS.STABLE), context, opts);
        this.getTemporaryToken = (tracingConfig) => {
            const metric = 'vtexid-temp-token';
            return this.http.get(routes.START, { metric, tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                } }).then(({ authenticationToken }) => authenticationToken);
        };
        this.sendCodeToEmail = (token, email, tracingConfig) => {
            const params = { authenticationToken: token, email };
            const metric = 'vtexid-send-code';
            return this.http.get(routes.SEND, { metric, params, tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                } });
        };
        this.getEmailCodeAuthenticationToken = (token, email, code, tracingConfig) => {
            const params = {
                accesskey: code,
                authenticationToken: token,
                login: email,
            };
            const metric = 'vtexid-email-token';
            return this.http.get(routes.VALIDATE, { metric, params, tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                } });
        };
        this.getPasswordAuthenticationToken = (token, email, password, tracingConfig) => {
            const params = {
                authenticationToken: token,
                login: email,
                password,
            };
            const metric = 'vtexid-pass-token';
            return this.http.get(routes.VALIDATE_CLASSIC, { metric, params, tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                } });
        };
    }
}
exports.ID = ID;

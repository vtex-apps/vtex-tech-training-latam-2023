"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InfraClient_1 = require("./InfraClient");
class Sphinx extends InfraClient_1.InfraClient {
    constructor(ioContext, opts) {
        super('sphinx@0.x', ioContext, opts, false);
        this.validatePolicies = (policies, tracingConfig) => {
            const metric = 'sphinx-validate-policy';
            return this.http.post('/policies/validate', { policies }, {
                metric,
                tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                },
            });
        };
        this.isAdmin = (email, tracingConfig) => {
            const metric = 'sphinx-is-admin';
            return this.http.get(`/user/${email}/isAdmin`, {
                metric,
                tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                },
            });
        };
    }
}
exports.Sphinx = Sphinx;

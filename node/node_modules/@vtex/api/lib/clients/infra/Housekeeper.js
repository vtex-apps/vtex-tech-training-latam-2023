"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InfraClient_1 = require("./InfraClient");
class Housekeeper extends InfraClient_1.InfraClient {
    constructor(context, options) {
        super('housekeeper@0.x', context, options);
        this.apply = async (data, tracingConfig) => {
            const metric = 'housekeeper-apply';
            return this.http.post('v2/housekeeping/apply', data, { metric, tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                } });
        };
        this.perform = async (tracingConfig) => {
            const metric = 'housekeeper-perform';
            return this.http.post('v2/_housekeeping/perform', {}, { metric, tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                } });
        };
        this.resolve = async (tracingConfig) => {
            const metric = 'housekeeper-resolve';
            return this.http.get('v2/housekeeping/resolve', { metric, tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                } });
        };
    }
}
exports.Housekeeper = Housekeeper;

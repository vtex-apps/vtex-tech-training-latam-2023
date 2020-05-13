"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InfraClient_1 = require("./InfraClient");
class BillingMetrics extends InfraClient_1.InfraClient {
    constructor(context, options) {
        super('colossus@0.x', context, options);
        this.sendMetric = (metric, tracingConfig) => {
            return this.http.post('/metrics', metric, { tracing: {
                    requestSpanNameSuffix: 'send-metric',
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                } });
        };
    }
}
exports.BillingMetrics = BillingMetrics;

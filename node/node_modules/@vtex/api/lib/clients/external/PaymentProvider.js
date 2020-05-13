"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExternalClient_1 = require("./ExternalClient");
const routes = {
    callback: (transactionId, paymentId) => `${routes.payment(transactionId, paymentId)}/notification`,
    inbound: (transactionId, paymentId, action) => `${routes.payment(transactionId, paymentId)}/inbound-request/${action}`,
    payment: (transactionId, paymentId) => `/transactions/${transactionId}/payments/${paymentId}`,
};
class PaymentProvider extends ExternalClient_1.ExternalClient {
    constructor(context, options) {
        var _a;
        super(`http://${context.account}.vtexpayments.com.br/payment-provider`, context, {
            ...(options !== null && options !== void 0 ? options : {}),
            headers: {
                ...((_a = options === null || options === void 0 ? void 0 : options.headers) !== null && _a !== void 0 ? _a : {}),
                'X-Vtex-Use-Https': 'true',
            },
        });
        this.context = context;
        this.callback = (transactionId, paymentId, callback, tracingConfig) => {
            const metric = 'gateway-callback';
            return this.http.post(routes.callback(transactionId, paymentId), callback, {
                metric,
                tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                },
            });
        };
        this.inbound = (transactionId, paymentId, action, payload, tracingConfig) => {
            const metric = 'gateway-inbound-request';
            return this.http.post(routes.inbound(transactionId, paymentId, action), payload, {
                metric,
                tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                },
            });
        };
    }
}
exports.PaymentProvider = PaymentProvider;

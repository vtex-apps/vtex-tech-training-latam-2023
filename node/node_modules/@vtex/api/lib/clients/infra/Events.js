"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InfraClient_1 = require("./InfraClient");
const eventRoute = (route) => `/events/${route}`;
class Events extends InfraClient_1.InfraClient {
    constructor(context, options) {
        super('courier@0.x', { ...context, recorder: undefined }, options);
        this.sendEvent = (subject, route, message, tracingConfig) => {
            const resource = subject === ''
                ? ''
                : `vrn:apps:aws-us-east-1:${this.context.account}:${this.context.workspace}:/apps/${subject}`;
            return this.http.put(eventRoute(route), message, {
                metric: 'events-send',
                params: { resource },
                tracing: {
                    requestSpanNameSuffix: 'events-send',
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                },
            });
        };
    }
}
exports.Events = Events;

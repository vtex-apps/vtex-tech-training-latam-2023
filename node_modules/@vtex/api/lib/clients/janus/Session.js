"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_1 = __importDefault(require("cookie"));
const ramda_1 = require("ramda");
const JanusClient_1 = require("./JanusClient");
const SESSION_COOKIE = 'vtex_session';
const routes = {
    base: '/api/sessions',
};
class Session extends JanusClient_1.JanusClient {
    constructor() {
        super(...arguments);
        /**
         * Get the session data using the given token
         */
        this.getSession = async (token, items, tracingConfig) => {
            const metric = 'session-get';
            const { data: sessionData, headers: { 'set-cookie': [setCookies], }, } = await this.http.getRaw(routes.base, ({
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `vtex_session=${token};`,
                },
                metric,
                params: {
                    items: items.join(','),
                },
                tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                },
            }));
            const parsedCookie = cookie_1.default.parse(setCookies);
            const sessionToken = ramda_1.prop(SESSION_COOKIE, parsedCookie);
            return {
                sessionData,
                sessionToken,
            };
        };
        /**
         * Update the public portion of this session
         */
        this.updateSession = (key, value, items, token, tracingConfig) => {
            const data = { public: { [key]: { value } } };
            const metric = 'session-update';
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `vtex_session=${token};`,
                },
                metric,
                params: {
                    items: items.join(','),
                },
                tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                },
            };
            return this.http.post(routes.base, data, config);
        };
    }
}
exports.Session = Session;

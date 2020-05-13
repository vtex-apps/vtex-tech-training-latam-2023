"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const error_1 = require("../../utils/error");
const console_1 = require("./console");
const linked = !!process.env.VTEX_APP_LINK;
const app = constants_1.APP.ID;
const EMPTY_MESSAGE = 'Logger.log was called with null or undefined message';
var LogLevel;
(function (LogLevel) {
    LogLevel["Debug"] = "debug";
    LogLevel["Info"] = "info";
    LogLevel["Warn"] = "warn";
    LogLevel["Error"] = "error";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
class Logger {
    constructor(ctx) {
        this.debug = (message) => this.log(message, LogLevel.Debug);
        this.info = (message) => this.log(message, LogLevel.Info);
        this.warn = (warning) => this.log(warning, LogLevel.Warn);
        this.error = (error) => this.log(error, LogLevel.Error);
        this.log = (message, level) => {
            var _a;
            const data = message ? error_1.cleanError(message) : EMPTY_MESSAGE;
            /* tslint:disable:object-literal-sort-keys */
            const inflatedLog = {
                __VTEX_IO_LOG: true,
                level,
                app,
                account: this.account,
                workspace: this.workspace,
                production: this.production,
                data,
                operationId: this.operationId,
                requestId: this.requestId,
                ...(((_a = this.tracingState) === null || _a === void 0 ? void 0 : _a.isTraceSampled) ? { traceId: this.tracingState.traceId } : null),
            };
            // Mark third-party apps logs to send to skidder
            if (constants_1.APP.IS_THIRD_PARTY()) {
                Object.assign(inflatedLog, {
                    __SKIDDER_TOPIC_1: `skidder.vendor.${constants_1.APP.VENDOR}`,
                    __SKIDDER_TOPIC_2: `skidder.app.${constants_1.APP.VENDOR}.${constants_1.APP.NAME}`,
                });
            }
            console.log(JSON.stringify(inflatedLog));
            // Warn the developer how to retrieve the error in splunk
            this.logSplunkQuery();
        };
        /**
         * Logs splunk query so the developer can search for the errors in splunk.
         * This function runs only once in the lifetime of the Logger class so we
         * don't mess up with the developer's terminal
         */
        this.logSplunkQuery = () => {
            if (linked) {
                const message = `Try this query at Splunk to retrieve error log: 'index=io_vtex_logs app="${app}" account=${this.account} workspace=${this.workspace} level=error OR level=warn'`;
                console_1.logOnceToDevConsole(message, LogLevel.Info);
            }
        };
        this.account = ctx.account;
        this.workspace = ctx.workspace;
        this.requestId = ctx.requestId;
        this.operationId = ctx.operationId;
        this.production = ctx.production;
        if (ctx.tracer) {
            this.tracingState = {
                isTraceSampled: ctx.tracer.isTraceSampled,
                traceId: ctx.tracer.traceId,
            };
        }
    }
}
exports.Logger = Logger;

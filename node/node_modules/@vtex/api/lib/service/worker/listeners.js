"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = require("os");
const RequestCancelledError_1 = require("../../errors/RequestCancelledError");
const logger_1 = require("../logger");
exports.logger = new logger_1.Logger({ account: 'unhandled', workspace: 'unhandled', requestId: 'unhandled', operationId: 'unhandled', production: process.env.VTEX_PRODUCTION === 'true' });
let watched;
// Remove the any typings once we move to nodejs 10.x
const handleSignal = signal => {
    const message = `Worker ${process.pid} received signal ${signal}`;
    console.warn(message);
    exports.logger.warn({ message, signal });
    process.exit(os_1.constants.signals[signal]);
};
exports.addProcessListeners = () => {
    // Listeners already set up
    if (watched) {
        return;
    }
    watched = process.on('uncaughtException', (err) => {
        console.error('uncaughtException', err);
        if (err && exports.logger) {
            err.type = 'uncaughtException';
            exports.logger.error(err);
        }
        process.exit(420);
    });
    process.on('unhandledRejection', (reason, promise) => {
        if (reason instanceof RequestCancelledError_1.RequestCancelledError) {
            return;
        }
        console.error('unhandledRejection', reason, promise);
        if (reason && exports.logger) {
            reason.type = 'unhandledRejection';
            exports.logger.error(reason);
        }
    });
    process.on('warning', (warning) => {
        console.warn(warning);
    });
    process.on('SIGINT', handleSignal);
    process.on('SIGTERM', handleSignal);
};

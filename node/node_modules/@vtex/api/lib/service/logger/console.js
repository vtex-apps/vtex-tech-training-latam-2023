"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cluster_1 = require("cluster");
const caches_1 = require("../../caches");
const history = new caches_1.LRUCache({
    max: 42,
});
exports.LOG_ONCE = 'logOnce';
exports.isLog = (message) => (message === null || message === void 0 ? void 0 : message.cmd) === exports.LOG_ONCE;
exports.log = (message, level) => {
    const logger = console[level];
    if (typeof logger === 'function') {
        logger(message);
    }
};
// Since we are now using clusters, if we simply console.log something,
// it may overwhelm the programmer's console with lots of repeated info.
// This function should be used when you want to warn about something
// only once
exports.logOnceToDevConsole = (message, level) => {
    const strigified = JSON.stringify(message);
    if (!history.has(strigified)) {
        history.set(strigified, true);
        if (cluster_1.isMaster) {
            exports.log(message, level);
        }
        else if (cluster_1.isWorker && process.send) {
            const logMessage = {
                cmd: exports.LOG_ONCE,
                level,
                message,
            };
            process.send(logMessage);
        }
    }
};

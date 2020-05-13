"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_retry_1 = require("axios-retry");
exports.TIMEOUT_CODE = 'ProxyTimeout';
const printLabel = (e, message) => {
    if (!e || !e.config || !e.config.label) {
        return;
    }
    console.warn(e.config.label, message);
};
exports.isNetworkErrorOrRouterTimeout = (e) => {
    if (axios_retry_1.isNetworkOrIdempotentRequestError(e)) {
        printLabel(e, 'Retry from network error');
        return true;
    }
    if (e && axios_retry_1.isSafeRequestError(e) && e.response && e.response.data && e.response.data.code === exports.TIMEOUT_CODE) {
        printLabel(e, 'Retry from timeout');
        return true;
    }
    return false;
};
// Retry on timeout from our end
exports.isAbortedOrNetworkErrorOrRouterTimeout = (e) => {
    if (e && e.code === 'ECONNABORTED') {
        printLabel(e, 'Retry from abort');
        return true;
    }
    return exports.isNetworkErrorOrRouterTimeout(e);
};
var axios_retry_2 = require("axios-retry");
exports.isNetworkOrIdempotentRequestError = axios_retry_2.isNetworkOrIdempotentRequestError;
exports.exponentialDelay = axios_retry_2.exponentialDelay;

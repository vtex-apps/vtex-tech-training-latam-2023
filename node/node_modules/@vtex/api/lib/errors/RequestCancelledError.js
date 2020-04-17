"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelledRequestStatus = 499;
exports.cancelledErrorCode = 'request_cancelled';
class RequestCancelledError extends Error {
    constructor(message) {
        super(message);
        this.code = exports.cancelledErrorCode;
    }
}
exports.RequestCancelledError = RequestCancelledError;

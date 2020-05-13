"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tooManyRequestsStatus = 429;
class TooManyRequestsError extends Error {
    constructor(message) {
        super(message || 'TOO_MANY_REQUESTS');
    }
}
exports.TooManyRequestsError = TooManyRequestsError;

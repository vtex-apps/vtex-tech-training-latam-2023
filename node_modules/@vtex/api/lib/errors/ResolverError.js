"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../service/logger");
const error_1 = require("../utils/error");
/**
 * The generic Error class to be thrown for caught errors inside resolvers.
 * Errors with status code greater than or equal to 500 are logged as errors.
 * All other status codes are logged as warnings. @see ResolverWarning
 *
 * @class ResolverError
 * @extends {Error}
 */
class ResolverError extends Error {
    /**
     * Creates an instance of ResolverError
     * @param {(string | AxiosError | ErrorLike)} messageOrError Either a message string or the complete original error object.
     * @param {number} [status=500]
     * @param {string} [code='RESOLVER_ERROR']
     */
    constructor(messageOrError, status = 500, code = 'RESOLVER_ERROR') {
        super(typeof messageOrError === 'string' ? messageOrError : messageOrError.message);
        this.status = status;
        this.code = code;
        this.name = 'ResolverError';
        this.level = logger_1.LogLevel.Error;
        if (typeof messageOrError === 'object') {
            // Copy original error properties without circular references
            Object.assign(this, error_1.cleanError(messageOrError));
        }
        if (typeof messageOrError === 'string' || !messageOrError.stack) {
            Error.captureStackTrace(this, ResolverError);
        }
    }
}
exports.ResolverError = ResolverError;

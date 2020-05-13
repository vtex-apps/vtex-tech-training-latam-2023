"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../service/logger");
const ResolverError_1 = require("./ResolverError");
/**
 * Indicates a non-fatal error occurred and was handled.
 * ResolverWarnings are logged with level "warning" denoting they were handled by user code.
 *
 * @class ResolverWarning
 * @extends {ResolverError}
 */
class ResolverWarning extends ResolverError_1.ResolverError {
    /**
     * Creates an instance of ResolverWarning
     * @param {(string | AxiosError | ErrorLike)} messageOrError Either a message string or the complete original error object.
     */
    constructor(messageOrError, status = 422, code = 'RESOLVER_WARNING') {
        super(messageOrError, status, code);
        this.status = status;
        this.code = code;
        this.name = 'ResolverWarning';
        this.level = logger_1.LogLevel.Warn;
        if (typeof messageOrError === 'string' || !messageOrError.stack) {
            Error.captureStackTrace(this, ResolverWarning);
        }
    }
}
exports.ResolverWarning = ResolverWarning;

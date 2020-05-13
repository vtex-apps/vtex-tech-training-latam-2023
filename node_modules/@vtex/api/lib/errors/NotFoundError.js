"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResolverWarning_1 = require("./ResolverWarning");
/**
 * Indicates a requested resource was not found.
 * ResolverWarnings are logged with level "warning" denoting they were handled by user code.
 *
 * @class NotFoundError
 * @extends {ResolverWarning}
 */
class NotFoundError extends ResolverWarning_1.ResolverWarning {
    /**
     * Creates an instance of NotFoundError
     * @param {(string | AxiosError | ErrorLike)} messageOrError Either a message string or the complete original error object.
     */
    constructor(messageOrError) {
        super(messageOrError, 404, 'NOT_FOUND');
        this.name = 'NotFoundError';
        if (typeof messageOrError === 'string' || !messageOrError.stack) {
            Error.captureStackTrace(this, NotFoundError);
        }
    }
}
exports.NotFoundError = NotFoundError;

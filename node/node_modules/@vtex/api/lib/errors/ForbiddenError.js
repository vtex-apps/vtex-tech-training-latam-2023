"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResolverWarning_1 = require("./ResolverWarning");
/**
 * Indicates user is not authorized to perform this action.
 * ResolverWarnings are logged with level "warning" denoting they were handled by user code.
 *
 * @class ForbiddenError
 * @extends {ResolverWarning}
 */
class ForbiddenError extends ResolverWarning_1.ResolverWarning {
    /**
     * Creates an instance of ForbiddenError
     * @param {(string | AxiosError | ErrorLike)} messageOrError Either a message string or the complete original error object.
     */
    constructor(messageOrError) {
        super(messageOrError, 403, 'FORBIDDEN');
        this.name = 'ForbiddenError';
        if (typeof messageOrError === 'string' || !messageOrError.stack) {
            Error.captureStackTrace(this, ForbiddenError);
        }
    }
}
exports.ForbiddenError = ForbiddenError;

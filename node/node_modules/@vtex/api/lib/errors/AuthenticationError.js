"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResolverWarning_1 = require("./ResolverWarning");
/**
 * Indicates user did not provide valid credentials for authenticating this request.
 * ResolverWarnings are logged with level "warning" denoting they were handled by user code.
 *
 * @class AuthenticationError
 * @extends {ResolverWarning}
 */
class AuthenticationError extends ResolverWarning_1.ResolverWarning {
    /**
     * Creates an instance of AuthenticationError
     * @param {(string | AxiosError | ErrorLike)} messageOrError Either a message string or the complete original error object.
     */
    constructor(messageOrError) {
        super(messageOrError, 401, 'UNAUTHENTICATED');
        this.name = 'AuthenticationError';
        if (typeof messageOrError === 'string' || !messageOrError.stack) {
            Error.captureStackTrace(this, AuthenticationError);
        }
    }
}
exports.AuthenticationError = AuthenticationError;

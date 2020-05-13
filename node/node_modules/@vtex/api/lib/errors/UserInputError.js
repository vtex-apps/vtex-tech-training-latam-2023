"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResolverWarning_1 = require("./ResolverWarning");
/**
 * Indicates user input is not valid for this action.
 * ResolverWarnings are logged with level "warning" denoting they were handled by user code.
 *
 * @class UserInputError
 * @extends {ResolverWarning}
 */
class UserInputError extends ResolverWarning_1.ResolverWarning {
    /**
     * Creates an instance of UserInputError
     * @param {(string | AxiosError | ErrorLike)} messageOrError Either a message string or the complete original error object.
     */
    constructor(messageOrError) {
        super(messageOrError, 400, 'BAD_USER_INPUT');
        this.name = 'UserInputError';
        if (typeof messageOrError === 'string' || !messageOrError.stack) {
            Error.captureStackTrace(this, UserInputError);
        }
    }
}
exports.UserInputError = UserInputError;

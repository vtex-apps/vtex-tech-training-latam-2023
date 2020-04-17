import { AxiosError } from 'axios';
import { ErrorLike } from './ResolverError';
import { ResolverWarning } from './ResolverWarning';
/**
 * Indicates user input is not valid for this action.
 * ResolverWarnings are logged with level "warning" denoting they were handled by user code.
 *
 * @class UserInputError
 * @extends {ResolverWarning}
 */
export declare class UserInputError extends ResolverWarning {
    name: string;
    /**
     * Creates an instance of UserInputError
     * @param {(string | AxiosError | ErrorLike)} messageOrError Either a message string or the complete original error object.
     */
    constructor(messageOrError: string | AxiosError | ErrorLike);
}

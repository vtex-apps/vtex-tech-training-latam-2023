import { AxiosError } from 'axios';
import { ErrorLike } from './ResolverError';
import { ResolverWarning } from './ResolverWarning';
/**
 * Indicates user is not authorized to perform this action.
 * ResolverWarnings are logged with level "warning" denoting they were handled by user code.
 *
 * @class ForbiddenError
 * @extends {ResolverWarning}
 */
export declare class ForbiddenError extends ResolverWarning {
    name: string;
    /**
     * Creates an instance of ForbiddenError
     * @param {(string | AxiosError | ErrorLike)} messageOrError Either a message string or the complete original error object.
     */
    constructor(messageOrError: string | AxiosError | ErrorLike);
}

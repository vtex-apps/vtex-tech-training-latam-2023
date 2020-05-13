import { AxiosError } from 'axios';
import { ErrorLike } from './ResolverError';
import { ResolverWarning } from './ResolverWarning';
/**
 * Indicates a requested resource was not found.
 * ResolverWarnings are logged with level "warning" denoting they were handled by user code.
 *
 * @class NotFoundError
 * @extends {ResolverWarning}
 */
export declare class NotFoundError extends ResolverWarning {
    name: string;
    /**
     * Creates an instance of NotFoundError
     * @param {(string | AxiosError | ErrorLike)} messageOrError Either a message string or the complete original error object.
     */
    constructor(messageOrError: string | AxiosError | ErrorLike);
}

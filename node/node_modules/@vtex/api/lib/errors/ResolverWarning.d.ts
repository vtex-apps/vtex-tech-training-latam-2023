import { AxiosError } from 'axios';
import { LogLevel } from '../service/logger';
import { ErrorLike, ResolverError } from './ResolverError';
/**
 * Indicates a non-fatal error occurred and was handled.
 * ResolverWarnings are logged with level "warning" denoting they were handled by user code.
 *
 * @class ResolverWarning
 * @extends {ResolverError}
 */
export declare class ResolverWarning extends ResolverError {
    status: number;
    code: string;
    name: string;
    level: LogLevel;
    /**
     * Creates an instance of ResolverWarning
     * @param {(string | AxiosError | ErrorLike)} messageOrError Either a message string or the complete original error object.
     */
    constructor(messageOrError: string | AxiosError | ErrorLike, status?: number, code?: string);
}

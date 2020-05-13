import { AxiosError } from 'axios';
import { LogLevel } from '../service/logger';
export interface ErrorLike {
    name?: string;
    message: string;
    stack?: string;
    [key: string]: any;
}
/**
 * The generic Error class to be thrown for caught errors inside resolvers.
 * Errors with status code greater than or equal to 500 are logged as errors.
 * All other status codes are logged as warnings. @see ResolverWarning
 *
 * @class ResolverError
 * @extends {Error}
 */
export declare class ResolverError extends Error {
    status: number;
    code: string;
    name: string;
    level: LogLevel;
    /**
     * Creates an instance of ResolverError
     * @param {(string | AxiosError | ErrorLike)} messageOrError Either a message string or the complete original error object.
     * @param {number} [status=500]
     * @param {string} [code='RESOLVER_ERROR']
     */
    constructor(messageOrError: string | AxiosError | ErrorLike, status?: number, code?: string);
}

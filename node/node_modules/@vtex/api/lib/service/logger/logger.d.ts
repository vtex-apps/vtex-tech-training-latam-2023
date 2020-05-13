import { IUserLandTracer } from '../../tracing';
import { IOContext } from '../worker/runtime/typings';
export interface LoggerTracingContext {
    requestTracer: IUserLandTracer;
}
export declare enum LogLevel {
    Debug = "debug",
    Info = "info",
    Warn = "warn",
    Error = "error"
}
interface LoggerContext extends Pick<IOContext, 'account' | 'workspace' | 'requestId' | 'operationId' | 'production'> {
    tracer?: IOContext['tracer'];
}
export declare class Logger {
    private account;
    private workspace;
    private operationId;
    private requestId;
    private production;
    private tracingState?;
    constructor(ctx: LoggerContext);
    debug: (message: any) => void;
    info: (message: any) => void;
    warn: (warning: any) => void;
    error: (error: any) => void;
    log: (message: any, level: LogLevel) => void;
    /**
     * Logs splunk query so the developer can search for the errors in splunk.
     * This function runs only once in the lifetime of the Logger class so we
     * don't mess up with the developer's terminal
     */
    private logSplunkQuery;
}
export {};

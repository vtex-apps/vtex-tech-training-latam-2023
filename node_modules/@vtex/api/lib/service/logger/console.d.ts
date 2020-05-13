import { LogLevel } from './logger';
export interface LogMessage {
    cmd: typeof LOG_ONCE;
    message: string;
    level: LogLevel;
}
export declare const LOG_ONCE = "logOnce";
export declare const isLog: (message: any) => message is LogMessage;
export declare const log: (message: any, level: LogLevel) => void;
export declare const logOnceToDevConsole: (message: any, level: LogLevel) => void;

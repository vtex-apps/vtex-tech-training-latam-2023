import { Context } from 'koa';
export declare class Recorder {
    private _record;
    constructor();
    clear(): void;
    record(headers?: Record<string, string>): void;
    flush(ctx: Context): void;
}

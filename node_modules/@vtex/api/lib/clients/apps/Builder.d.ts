/// <reference types="node" />
import { ZlibOptions } from 'zlib';
import { InstanceOptions, RequestTracingConfig } from '../../HttpClient';
import { IOContext } from '../../service/worker/runtime/typings';
import { Change } from '../infra/Apps';
import { File } from '../infra/Registry';
import { AppClient } from './AppClient';
export declare class Builder extends AppClient {
    private stickyHost;
    constructor(ioContext: IOContext, opts?: InstanceOptions);
    availability: (app: string, hintIndex: number, tracingConfig?: RequestTracingConfig | undefined) => Promise<{
        host: string;
        hostname: string | undefined;
        score: number;
    }>;
    clean: (app: string, tracingConfig?: RequestTracingConfig | undefined) => Promise<BuildResult>;
    getPinnedDependencies: (tracingConfig?: RequestTracingConfig | undefined) => Promise<any>;
    linkApp: (app: string, files: File[], zipOptions?: ZipOptions, params?: RequestParams, tracingConfig?: RequestTracingConfig | undefined) => Promise<BuildResult>;
    publishApp: (app: string, files: File[], zipOptions?: ZipOptions, params?: RequestParams, tracingConfig?: RequestTracingConfig | undefined) => Promise<BuildResult>;
    relinkApp: (app: string, changes: Change[], params?: RequestParams, tracingConfig?: RequestTracingConfig | undefined) => Promise<BuildResult>;
    testApp: (app: string, files: File[], zipOptions?: ZipOptions, params?: RequestParams, tracingConfig?: RequestTracingConfig | undefined) => Promise<BuildResult>;
    private zipAndSend;
}
interface RequestParams {
    tsErrorsAsWarnings?: boolean;
    skipSemVerEnsure?: boolean;
}
interface ZipOptions {
    sticky?: boolean;
    stickyHint?: string;
    tag?: string;
    zlib?: ZlibOptions;
}
export interface BuildResult {
    availability?: AvailabilityResponse;
    code?: string;
    message?: any;
    timeNano?: number;
}
export interface AvailabilityResponse {
    host: string | undefined;
    hostname: string | undefined;
    score: number;
}
export {};

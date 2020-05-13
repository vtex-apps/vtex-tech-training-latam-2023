import { InstanceOptions, RequestTracingConfig } from '../../HttpClient';
import { IOContext } from '../../service/worker/runtime/typings';
import { InfraClient } from './InfraClient';
export declare class Workspaces extends InfraClient {
    constructor(context: IOContext, options?: InstanceOptions);
    list: (account: string, tracingConfig?: RequestTracingConfig | undefined) => Promise<WorkspaceMetadata[]>;
    get: (account: string, workspace: string, tracingConfig?: RequestTracingConfig | undefined) => Promise<WorkspaceMetadata>;
    set: (account: string, workspace: string, metadata: Partial<WorkspaceMetadata>, tracingConfig?: RequestTracingConfig | undefined) => Promise<void>;
    create: (account: string, workspace: string, production: boolean, tracingConfig?: RequestTracingConfig | undefined) => Promise<void>;
    delete: (account: string, workspace: string, tracingConfig?: RequestTracingConfig | undefined) => Promise<import("../../HttpClient").IOResponse<void>>;
    reset: (account: string, workspace: string, metadata?: Partial<WorkspaceMetadata>, tracingConfig?: RequestTracingConfig | undefined) => Promise<void>;
    promote: (account: string, workspace: string, tracingConfig?: RequestTracingConfig | undefined) => Promise<void>;
}
export interface WorkspaceMetadata {
    name: string;
    weight: number;
    production: boolean;
}

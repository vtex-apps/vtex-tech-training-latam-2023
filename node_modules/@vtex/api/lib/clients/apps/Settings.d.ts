import { InstanceOptions, RequestTracingConfig } from '../../HttpClient';
import { IOContext } from '../../service/worker/runtime/typings';
import { AppMetaInfo } from '../infra/Apps';
import { AppClient } from './AppClient';
export interface SettingsParams {
    merge?: boolean;
    files?: string[];
}
export declare class Settings extends AppClient {
    constructor(context: IOContext, options?: InstanceOptions);
    getFilteredDependencies(appAtMajor: string, dependencies: AppMetaInfo[]): AppMetaInfo[];
    getDependenciesHash(dependencies: AppMetaInfo[]): string;
    getSettings(dependencies: AppMetaInfo[], appAtMajor: string, params?: SettingsParams, tracingConfig?: RequestTracingConfig): Promise<any>;
}

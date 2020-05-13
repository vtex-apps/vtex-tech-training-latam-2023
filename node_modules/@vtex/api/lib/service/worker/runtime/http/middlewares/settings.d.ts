import { AppMetaInfo, Apps } from '../../../../../clients/infra/Apps';
import { IOClients } from '../../../../../clients/IOClients';
import { RequestTracingConfig } from '../../../../../HttpClient';
import { Assets } from './../../../../../clients/infra/Assets';
import { ParamsContext, RecorderState, ServiceContext } from './../../typings';
export declare const getFilteredDependencies: (appAtMajor: string, dependencies: AppMetaInfo[]) => AppMetaInfo[];
export declare const getDependenciesHash: (dependencies: AppMetaInfo[]) => string;
export declare const getDependenciesSettings: (apps: Apps, assets: Assets, tracingConfig?: RequestTracingConfig | undefined) => Promise<Record<string, any>[]>;
export declare const getServiceSettings: () => <T extends IOClients, U extends RecorderState, V extends ParamsContext>(ctx: ServiceContext<T, U, V>, next: () => Promise<void>) => Promise<void>;

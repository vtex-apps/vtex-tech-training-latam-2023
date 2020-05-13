import { AppMetaInfo } from '../clients/infra/Apps';
export declare const removeBuild: (id: string) => string;
export declare const removeVersionFromAppId: (appId: string) => string;
export declare const extractVersionFromAppId: (appId: string) => string;
export declare const transformToLinkedLocator: (appId: string) => string;
export declare const formatLocator: (name: string, versionAndBuild: string) => string;
export declare const isLinkedApp: (app: AppMetaInfo) => boolean;
export declare const parseAppId: (appId: string) => ParsedLocator;
export declare const formatAppId: ({ locator, build }: ParsedLocator) => string;
export declare const satisfies: (appId: string, version: string) => boolean;
export declare const versionToMajor: (version: string) => string;
export declare const versionToMajorRange: (version: string) => string;
export declare const formatMajorLocator: (name: string, version: string) => string;
export declare const appIdToAppAtMajor: (appId: string) => string;
export declare const isValidAppIdOrLocator: (appId: string) => boolean;
export interface ParsedLocator {
    name: string;
    version: string;
    locator: string;
    build?: string;
}

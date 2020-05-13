import { ServiceJSON } from '../typings';
interface PrivateRouteInfo {
    protocol?: 'http' | 'https';
    vendor: string;
    name: string;
    major: string | number;
    account: string;
    workspace: string;
    path?: string;
}
export declare const formatPrivateRoute: ({ protocol, vendor, name, major, account, workspace, path }: PrivateRouteInfo) => string;
export declare const formatPublicRoute: ({ workspace, account, endpoint, path }: {
    workspace: string;
    account: string;
    endpoint: string;
    path: string;
}) => string;
export declare const logAvailableRoutes: (service: ServiceJSON) => void;
export {};

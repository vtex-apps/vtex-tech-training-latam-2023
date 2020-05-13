export declare const TIMEOUT_CODE = "ProxyTimeout";
export declare const isNetworkErrorOrRouterTimeout: (e: any) => boolean;
export declare const isAbortedOrNetworkErrorOrRouterTimeout: (e: any) => boolean;
export { isNetworkOrIdempotentRequestError, exponentialDelay } from 'axios-retry';

import { RequestTracingConfig } from '../../HttpClient';
import { JanusClient } from './JanusClient';
export declare class LicenseManager extends JanusClient {
    getAccountData(VtexIdclientAutCookie: string, tracingConfig?: RequestTracingConfig): Promise<any>;
    getTopbarData(VtexIdclientAutCookie: string, tracingConfig?: RequestTracingConfig): Promise<any>;
    canAccessResource(VtexIdclientAutCookie: string, resourceKey: string, tracingConfig?: RequestTracingConfig): Promise<boolean>;
}

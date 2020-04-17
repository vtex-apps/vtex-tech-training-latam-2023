import { InstanceOptions, RequestConfig } from '../../HttpClient/typings';
import { IOContext } from '../../service/worker/runtime/typings';
import { JanusClient } from './JanusClient';
export interface Binding {
    id: string;
    canonicalBaseAddress: string;
    alternateBaseAddresses: string[];
    defaultLocale: string;
    supportedLocales: string[];
    defaultCurrency: string;
    supportedCurrencies: string[];
    extraContext: Record<string, any>;
    targetProduct: string;
}
export interface Tenant {
    id: string;
    slug: string;
    title: string;
    edition: string;
    infra: string;
    bindings: Binding[];
    defaultCurrency: string;
    defaultLocale: string;
    metadata: Record<string, string>;
}
export declare class TenantClient extends JanusClient {
    constructor(ctx: IOContext, opts?: InstanceOptions);
    info: (config?: RequestConfig | undefined) => Promise<Tenant>;
}

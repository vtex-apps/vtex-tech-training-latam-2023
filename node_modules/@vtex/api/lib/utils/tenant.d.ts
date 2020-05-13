export interface TenantHeader {
    locale: string;
}
export declare const formatTenantHeaderValue: (tenant: TenantHeader) => string;
export declare const parseTenantHeaderValue: (value: string) => TenantHeader;

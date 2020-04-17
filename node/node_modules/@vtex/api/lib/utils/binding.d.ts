export interface BindingHeader {
    id?: string;
    rootPath?: string;
    locale: string;
    currency?: string;
}
declare enum BindingHeaderFormat {
    webframework0 = "v0+webframework",
    kuberouter0 = "v0+kuberouter"
}
export declare const formatBindingHeaderValue: (binding: BindingHeader, format?: BindingHeaderFormat) => string;
export declare const parseBindingHeaderValue: (value: string) => BindingHeader;
export {};

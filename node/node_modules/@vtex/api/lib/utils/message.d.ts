export declare const PROVIDER_SPACER = "::";
export interface IOMessage {
    id: string;
    content?: string;
    description?: string;
    from?: string;
    to?: string;
    behavior?: string;
}
export declare const providerFromMessage: (message: IOMessage) => string;
export declare const parseIOMessageId: ({ id }: IOMessage) => {
    locator: string;
    provider: string;
} | {
    locator: string;
    provider?: undefined;
};
export declare const removeProviderFromId: (message: IOMessage) => {
    id: string;
    content?: string | undefined;
    description?: string | undefined;
    from?: string | undefined;
    to?: string | undefined;
    behavior?: string | undefined;
};

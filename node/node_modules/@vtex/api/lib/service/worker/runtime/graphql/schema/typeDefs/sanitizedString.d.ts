import { GraphQLScalarType } from 'graphql';
export declare const scalar = "IOSanitizedString";
export interface SanitizeOptions {
    allowHTMLTags?: boolean;
    stripIgnoreTag?: boolean;
}
export declare class IOSanitizedStringType extends GraphQLScalarType {
    constructor(options?: SanitizeOptions);
}
export declare const resolvers: IOSanitizedStringType;

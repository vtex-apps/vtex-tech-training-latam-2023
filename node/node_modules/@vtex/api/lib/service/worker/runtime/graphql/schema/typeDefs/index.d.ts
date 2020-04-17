import { GraphQLScalarType } from 'graphql';
export declare const nativeResolvers: {
    IOSanitizedString: import("./sanitizedString").IOSanitizedStringType;
    IOUpload: GraphQLScalarType;
    Upload: GraphQLScalarType;
};
export declare const nativeTypeDefs: (metaData: Record<string, boolean>) => string;

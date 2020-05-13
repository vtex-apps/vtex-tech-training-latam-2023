import { GraphQLField } from 'graphql';
import { SchemaDirectiveVisitor } from 'graphql-tools';
import { ServiceContext } from '../../../typings';
export declare class TranslatableV2 extends SchemaDirectiveVisitor {
    visitFieldDefinition(field: GraphQLField<any, ServiceContext>): void;
}
export interface TranslatableMessageV2 {
    from?: string;
    content: string;
    context?: string;
}
export declare const parseTranslatableStringV2: (rawMessage: string) => TranslatableMessageV2;
export declare const formatTranslatableStringV2: ({ from, content, context }: TranslatableMessageV2) => string;
export declare const translatableV2DirectiveTypeDefs = "\ndirective @translatableV2(\n  behavior: String\n  withAppsMetaInfo: Boolean\n) on FIELD_DEFINITION\n";

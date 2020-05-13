import { GraphQLField } from 'graphql';
import { SchemaDirectiveVisitor } from 'graphql-tools';
export declare class SmartCacheDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field: GraphQLField<any, any>): void;
}
export declare const smartCacheDirectiveTypeDefs = "\ndirective @smartcache(\n  maxAge: String\n) on FIELD_DEFINITION\n";

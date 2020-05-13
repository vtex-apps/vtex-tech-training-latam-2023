import { GraphQLField } from 'graphql';
import { SchemaDirectiveVisitor } from 'graphql-tools';
import { GraphQLServiceContext } from '../../typings';
export declare class CacheControl extends SchemaDirectiveVisitor {
    visitFieldDefinition(field: GraphQLField<any, GraphQLServiceContext>): void;
}
export declare const cacheControlDirectiveTypeDefs = "\n\nenum IOCacheControlScope {\n  SEGMENT\n  PUBLIC\n  PRIVATE\n}\n\ndirective @cacheControl(\n  maxAge: Int\n  scope: IOCacheControlScope\n) on FIELD_DEFINITION\n";

import { GraphQLField } from 'graphql';
import { SchemaDirectiveVisitor } from 'graphql-tools';
export declare class Auth extends SchemaDirectiveVisitor {
    visitFieldDefinition(field: GraphQLField<any, any>): void;
}
export declare const authDirectiveTypeDefs = "\ndirective @auth(\n  productCode: String\n  resourceCode: String\n) on FIELD_DEFINITION\n";

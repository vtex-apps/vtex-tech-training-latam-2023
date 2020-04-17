import { GraphQLArgument, GraphQLField, GraphQLInputField } from 'graphql';
import { SchemaDirectiveVisitor } from 'graphql-tools';
export declare class SanitizeDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field: GraphQLField<any, any>): void;
    visitInputFieldDefinition(field: GraphQLInputField): void;
    visitArgumentDefinition(argument: GraphQLArgument): void;
    wrapType(field: any): void;
}
export declare const sanitizeDirectiveTypeDefs = "\ndirective @sanitize(\n  allowHTMLTags: Boolean\n  stripIgnoreTag: Boolean\n) on FIELD_DEFINITION | INPUT_FIELD_DEFINITION | ARGUMENT_DEFINITION\n";

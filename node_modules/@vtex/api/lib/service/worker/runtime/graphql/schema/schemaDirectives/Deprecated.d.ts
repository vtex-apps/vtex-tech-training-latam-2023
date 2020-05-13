import { GraphQLArgument, GraphQLField, GraphQLInputField } from 'graphql';
import { SchemaDirectiveVisitor } from 'graphql-tools';
import { Logger } from '../../../../../logger/logger';
import { GraphQLServiceContext } from '../../typings';
export declare class Deprecated extends SchemaDirectiveVisitor {
    visitArgumentDefinition(argument: GraphQLArgument): void;
    visitInputFieldDefinition(field: GraphQLInputField): void;
    visitFieldDefinition(field: GraphQLField<any, GraphQLServiceContext>): void;
    protected maybeLogToSplunk<T>(payload: T, logger?: Logger): void;
}
export declare const deprecatedDirectiveTypeDefs = "\ndirective @deprecated(\n  reason: String = \"No longer supported\"\n) on\n    FIELD_DEFINITION\n  | INPUT_FIELD_DEFINITION\n  | ARGUMENT_DEFINITION\n  | FRAGMENT_DEFINITION\n";

import { GraphQLField } from 'graphql';
import { SchemaDirectiveVisitor } from 'graphql-tools';
export declare class SettingsDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field: GraphQLField<any, any>): void;
}
export declare const settingsDirectiveTypeDefs = "\ndirective @settings(\n  settingsType: String\n) on FIELD_DEFINITION\n";

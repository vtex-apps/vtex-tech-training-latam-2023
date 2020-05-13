"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const graphql_tools_1 = require("graphql-tools");
const sanitizedString_1 = require("../typeDefs/sanitizedString");
class SanitizeDirective extends graphql_tools_1.SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        this.wrapType(field);
    }
    visitInputFieldDefinition(field) {
        this.wrapType(field);
    }
    visitArgumentDefinition(argument) {
        this.wrapType(argument);
    }
    wrapType(field) {
        const options = this.args;
        if (field.type instanceof graphql_1.GraphQLNonNull && field.type.ofType instanceof graphql_1.GraphQLScalarType) {
            field.type = new graphql_1.GraphQLNonNull(new sanitizedString_1.IOSanitizedStringType(options));
        }
        else if (field.type instanceof graphql_1.GraphQLScalarType) {
            field.type = new sanitizedString_1.IOSanitizedStringType(options);
        }
        else {
            throw new Error('Can not apply @sanitize directive to non-scalar GraphQL type');
        }
    }
}
exports.SanitizeDirective = SanitizeDirective;
exports.sanitizeDirectiveTypeDefs = `
directive @sanitize(
  allowHTMLTags: Boolean
  stripIgnoreTag: Boolean
) on FIELD_DEFINITION | INPUT_FIELD_DEFINITION | ARGUMENT_DEFINITION
`;

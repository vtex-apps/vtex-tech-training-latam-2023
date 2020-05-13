"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const name = 'IOUpload';
exports.scalar = name;
exports.resolvers = new graphql_1.GraphQLScalarType({
    description: 'The `IOUpload` scalar type represents a file upload.',
    name,
    parseValue: (value) => value,
    parseLiteral() {
        throw new Error('‘IOUpload’ scalar literal unsupported.');
    },
    serialize() {
        throw new Error('‘IOUpload’ scalar serialization unsupported.');
    },
});

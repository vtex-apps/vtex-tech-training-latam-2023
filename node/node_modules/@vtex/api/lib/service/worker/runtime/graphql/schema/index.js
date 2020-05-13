"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const graphql_tools_1 = require("graphql-tools");
const ramda_1 = require("ramda");
const schemaDirectives_1 = require("./schemaDirectives");
const typeDefs_1 = require("./typeDefs");
const mergeTypeDefs = (appTypeDefs, schemaMetaData) => [
    appTypeDefs,
    typeDefs_1.nativeTypeDefs(schemaMetaData),
    schemaDirectives_1.nativeSchemaDirectivesTypeDefs,
].join('\n\n');
const hasScalar = (typeDefs) => (scalar) => new RegExp(`scalar(\\s)+${scalar}(\\s\\n)+`).test(typeDefs);
const extractSchemaMetaData = (typeDefs) => {
    const scalars = ramda_1.keys(typeDefs_1.nativeResolvers);
    const scalarsPresentInSchema = ramda_1.map(hasScalar(typeDefs), scalars);
    return ramda_1.zipObj(scalars, scalarsPresentInSchema);
};
exports.makeSchema = (options) => {
    const { resolvers: appResolvers, schema: appSchema, schemaDirectives: appDirectives, } = options;
    const appTypeDefs = appSchema || fs_extra_1.readFileSync('./service/schema.graphql', 'utf8');
    const schemaMetaData = extractSchemaMetaData(appTypeDefs);
    const executableSchema = graphql_tools_1.makeExecutableSchema({
        resolvers: {
            ...appResolvers,
            ...typeDefs_1.nativeResolvers,
        },
        schemaDirectives: {
            ...appDirectives,
            ...schemaDirectives_1.nativeSchemaDirectives,
        },
        typeDefs: mergeTypeDefs(appTypeDefs, schemaMetaData),
    });
    return executableSchema;
};

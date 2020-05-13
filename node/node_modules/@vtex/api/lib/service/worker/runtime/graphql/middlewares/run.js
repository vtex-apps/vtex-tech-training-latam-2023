"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
exports.run = (schema) => async function runHttpQuery(ctx, next) {
    const { graphql: { query, }, } = ctx;
    const { document, operationName, variables: variableValues, } = query;
    const response = await graphql_1.execute({
        contextValue: ctx,
        document,
        fieldResolver: (root, _, __, info) => root[info.fieldName],
        operationName,
        rootValue: null,
        schema,
        variableValues,
    });
    ctx.graphql.graphqlResponse = response;
    await next();
};

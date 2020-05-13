"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const co_body_1 = require("co-body");
const graphql_1 = require("graphql");
const url_1 = require("url");
const constants_1 = require("../../../../../constants");
const LRUCache_1 = require("./../../../../../caches/LRUCache");
const documentStorage = new LRUCache_1.LRUCache({
    max: 500,
});
const queryFromUrl = (url) => {
    const parsedUrl = url_1.parse(url, true);
    const { query: querystringObj } = parsedUrl;
    // Having a BODY_HASH means the query is in the body
    if (querystringObj && querystringObj[constants_1.BODY_HASH]) {
        return null;
    }
    // We need to JSON.parse the variables since they are a stringified
    // in the querystring
    if (querystringObj && typeof querystringObj.variables === 'string') {
        querystringObj.variables = JSON.parse(querystringObj.variables);
    }
    return querystringObj;
};
const parseAndValidateQueryToSchema = (query, schema) => {
    const document = graphql_1.parse(query);
    const validation = graphql_1.validate(schema, document);
    if (Array.isArray(validation) && validation.length > 0) {
        throw validation;
    }
    return document;
};
exports.extractQuery = (schema) => async function parseAndValidateQuery(ctx, next) {
    const { request, req } = ctx;
    let query;
    if (request.is('multipart/form-data')) {
        query = request.body;
    }
    else if (request.method.toUpperCase() === 'POST') {
        query = await co_body_1.json(req, { limit: '3mb' });
    }
    else {
        query = queryFromUrl(request.url) || await co_body_1.json(req, { limit: '3mb' });
    }
    // Assign the query before setting the query.document because if the
    // validation fails we don't loose the query in our error log
    ctx.graphql.query = query;
    query.document = await documentStorage.getOrSet(query.query, async () => ({
        value: parseAndValidateQueryToSchema(query.query, schema),
    }));
    await next();
};

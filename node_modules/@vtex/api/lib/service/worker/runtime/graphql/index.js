"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tracingMiddlewares_1 = require("../../../tracing/tracingMiddlewares");
const http_1 = require("../http");
const context_1 = require("./middlewares/context");
const error_1 = require("./middlewares/error");
const query_1 = require("./middlewares/query");
const response_1 = require("./middlewares/response");
const run_1 = require("./middlewares/run");
const upload_1 = require("./middlewares/upload");
const schema_1 = require("./schema");
exports.GRAPHQL_ROUTE = '__graphql';
exports.createGraphQLRoute = (graphql, clientsConfig, serviceRoute, routeId) => {
    const schema = schema_1.makeSchema(graphql);
    const pipeline = [
        tracingMiddlewares_1.nameSpanOperationMiddleware('graphql-handler', exports.GRAPHQL_ROUTE),
        context_1.injectGraphqlContext,
        response_1.response,
        error_1.graphqlError,
        upload_1.upload,
        query_1.extractQuery(schema),
        run_1.run(schema),
    ];
    return http_1.createPrivateHttpRoute(clientsConfig, pipeline, serviceRoute, routeId);
};

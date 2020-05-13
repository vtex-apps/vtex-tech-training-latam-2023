"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GraphQLClient_1 = require("../HttpClient/GraphQLClient");
const IOClient_1 = require("./IOClient");
/**
 * A GraphQL client that can be instantiated by the Serviceruntime layer.
 */
class IOGraphQLClient extends IOClient_1.IOClient {
    constructor(context, options) {
        super(context, options);
        this.context = context;
        this.options = options;
        this.graphql = new GraphQLClient_1.GraphQLClient(this.http);
    }
}
exports.IOGraphQLClient = IOGraphQLClient;

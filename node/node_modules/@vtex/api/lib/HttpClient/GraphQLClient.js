"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customGraphQLError_1 = __importDefault(require("../errors/customGraphQLError"));
const inflight_1 = require("./middlewares/inflight");
const throwOnGraphQLErrors = (message, response) => {
    if (response && response.errors && response.errors.length > 0) {
        throw new customGraphQLError_1.default(message, response.errors);
    }
    return response;
};
class GraphQLClient {
    constructor(http) {
        this.http = http;
        this.query = ({ query, variables, inflight, extensions, throwOnError }, config = {}) => this.http.getWithBody(config.url || '', { query, variables, extensions }, {
            inflightKey: inflight !== false ? inflight_1.inflightUrlWithQuery : undefined,
            ...config,
        })
            .then(graphqlResponse => throwOnError === false
            ? graphqlResponse
            : throwOnGraphQLErrors(this.http.name, graphqlResponse));
        this.mutate = ({ mutate, variables, throwOnError }, config = {}) => this.http.post(config.url || '', { query: mutate, variables }, config)
            .then(graphqlResponse => throwOnError === false
            ? graphqlResponse
            : throwOnGraphQLErrors(this.http.name, graphqlResponse));
    }
}
exports.GraphQLClient = GraphQLClient;

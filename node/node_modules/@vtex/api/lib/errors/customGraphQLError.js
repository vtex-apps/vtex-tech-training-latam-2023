"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomGraphQLError extends Error {
    constructor(message, graphQLErrors) {
        super(message);
        this.graphQLErrors = graphQLErrors;
    }
}
exports.default = CustomGraphQLError;

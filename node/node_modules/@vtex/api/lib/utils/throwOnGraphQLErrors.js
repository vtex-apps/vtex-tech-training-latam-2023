"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customGraphQLError_1 = __importDefault(require("../errors/customGraphQLError"));
function throwOnGraphQLErrors(message) {
    return function maybeGraphQLResponse(response) {
        if (response && response.errors && response.errors.length > 0) {
            throw new customGraphQLError_1.default(message, response.errors);
        }
        return response;
    };
}
exports.throwOnGraphQLErrors = throwOnGraphQLErrors;

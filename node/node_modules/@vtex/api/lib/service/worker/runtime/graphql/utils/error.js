"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
const error_1 = require("../../../../../utils/error");
const ERROR_FIELD_WHITELIST = ['message', 'path', 'stack', 'extensions', 'statusCode', 'name', 'headers', 'originalError', 'code'];
const QUERY_FIELDS = ['query', 'operationName', 'variables'];
const trimVariables = (variables) => {
    if (variables) {
        const stringifiedVariables = JSON.stringify(variables);
        return stringifiedVariables.length <= 1024
            ? stringifiedVariables
            : `${stringifiedVariables.slice(0, 992)} [Truncated: variables too long]`;
    }
    return '';
};
const detailsFromCtx = (ctx) => {
    const { headers: { 'x-forwarded-host': forwardedHost, 'x-forwarded-proto': forwardedProto, 'x-vtex-platform': platform, }, vtex: { operationId, requestId, }, } = ctx;
    const queryRest = ramda_1.pick(QUERY_FIELDS, ctx.graphql.query || {});
    const variables = ctx.request.is('multipart/form-data')
        ? '[GraphQL Upload]'
        : trimVariables(queryRest.variables);
    const query = {
        ...queryRest,
        variables,
    };
    return {
        forwardedHost,
        forwardedProto,
        operationId,
        platform,
        query,
        requestId,
    };
};
const formatError = (error, details) => {
    const formattedError = ramda_1.pick(ERROR_FIELD_WHITELIST, error);
    if (!formattedError.extensions) {
        formattedError.extensions = {
            code: 'INTERNAL_SERVER_ERROR',
        };
    }
    if (formattedError.originalError) {
        formattedError.originalError = error_1.cleanError(formattedError.originalError);
        if (formattedError.stack === formattedError.originalError.stack) {
            delete formattedError.originalError.stack;
        }
        if (!formattedError.extensions.exception) {
            formattedError.extensions.exception = {
                message: formattedError.originalError.message,
                name: formattedError.originalError.name,
                stack: formattedError.originalError.stack,
                ...formattedError.originalError,
            };
        }
        else {
            const extendedException = {
                message: formattedError.originalError.message,
                name: formattedError.originalError.name,
                stack: formattedError.originalError.stack,
                ...formattedError.originalError,
                ...formattedError.extensions.exception,
            };
            formattedError.extensions.exception = error_1.cleanError(extendedException);
        }
        // Make originalError not enumerable to prevent duplicated log and response information
        Object.defineProperty(formattedError, 'originalError', { enumerable: false });
    }
    Object.assign(formattedError, details);
    return formattedError;
};
exports.createFormatError = (ctx) => {
    const details = detailsFromCtx(ctx);
    return (error) => formatError(error, details);
};

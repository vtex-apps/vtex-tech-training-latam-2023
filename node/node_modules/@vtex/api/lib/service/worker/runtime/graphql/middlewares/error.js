"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_errors_1 = require("apollo-server-errors");
const ramda_1 = require("ramda");
const RequestCancelledError_1 = require("../../../../../errors/RequestCancelledError");
const logger_1 = require("../../../../logger");
const error_1 = require("../utils/error");
const pathname_1 = require("../utils/pathname");
const TWO_SECONDS_S = 2;
const uniqErrorsByPath = (errors) => ramda_1.uniqBy(e => e.extensions && e.extensions.exception && e.extensions.exception.request
    ? e.extensions.exception.request.path
    : e, errors);
const createLogErrorToSplunk = (vtex) => (err) => {
    var _a, _b, _c, _d;
    const { route: { id }, logger, } = vtex;
    // Prevent logging cancellation error (it's not an error)
    if (((_b = (_a = err === null || err === void 0 ? void 0 : err.extensions) === null || _a === void 0 ? void 0 : _a.exception) === null || _b === void 0 ? void 0 : _b.code) === RequestCancelledError_1.cancelledErrorCode) {
        return;
    }
    // Add pathName to each error
    if (err.path) {
        err.pathName = pathname_1.generatePathName(err.path);
    }
    const log = {
        ...err,
        routeId: id,
    };
    // Grab level from originalError, default to "error" level.
    let level = (_d = (_c = err === null || err === void 0 ? void 0 : err.extensions) === null || _c === void 0 ? void 0 : _c.exception) === null || _d === void 0 ? void 0 : _d.level;
    if (!level || !(level === logger_1.LogLevel.Error || level === logger_1.LogLevel.Warn)) {
        level = logger_1.LogLevel.Error;
    }
    logger.log(log, level);
};
async function graphqlError(ctx, next) {
    const { vtex: { production }, } = ctx;
    let graphQLErrors = null;
    try {
        await next();
        const response = ctx.graphql.graphqlResponse;
        if (response && Array.isArray(response.errors)) {
            const formatter = error_1.createFormatError(ctx);
            graphQLErrors = apollo_server_errors_1.formatApolloErrors(response.errors, { formatter });
        }
    }
    catch (e) {
        if (e.code === RequestCancelledError_1.cancelledErrorCode) {
            ctx.status = RequestCancelledError_1.cancelledRequestStatus;
            return;
        }
        const formatError = error_1.createFormatError(ctx);
        graphQLErrors = Array.isArray(e)
            ? e.map(formatError)
            : [formatError(e)];
        // Add response
        ctx.status = e.statusCode || 500;
        if (e.headers) {
            ctx.set(e.headers);
        }
    }
    finally {
        if (graphQLErrors) {
            ctx.graphql.status = 'error';
            // Filter errors from the same path in the query. This should
            // avoid logging multiple errors from an array for example
            const uniqueErrors = uniqErrorsByPath(graphQLErrors);
            // Log each error to splunk individually
            const logToSplunk = createLogErrorToSplunk(ctx.vtex);
            uniqueErrors.forEach(logToSplunk);
            // In production errors, add two second cache
            if (production) {
                ctx.graphql.cacheControl.maxAge = TWO_SECONDS_S;
            }
            else {
                ctx.graphql.cacheControl.noCache = true;
                ctx.graphql.cacheControl.noStore = true;
            }
            ctx.graphql.graphqlResponse = {
                ...ctx.graphql.graphqlResponse,
                errors: uniqueErrors,
            };
        }
    }
}
exports.graphqlError = graphqlError;

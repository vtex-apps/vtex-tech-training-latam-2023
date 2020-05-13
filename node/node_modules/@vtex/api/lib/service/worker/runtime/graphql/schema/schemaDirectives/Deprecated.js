"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const graphql_tools_1 = require("graphql-tools");
const listeners_1 = require("../../../../listeners");
let lastLog = process.hrtime();
const LOG_PERIOD_S = 60;
const hrtimeToS = (time) => time[0] + (time[1] / 1e9);
class Deprecated extends graphql_tools_1.SchemaDirectiveVisitor {
    visitArgumentDefinition(argument) {
        this.maybeLogToSplunk({
            description: argument.description,
            name: argument.name,
        });
    }
    visitInputFieldDefinition(field) {
        this.maybeLogToSplunk({
            description: field.description,
            name: field.name,
        });
    }
    visitFieldDefinition(field) {
        const { resolve = graphql_1.defaultFieldResolver, name, type } = field;
        const { reason } = this.args;
        field.resolve = (root, args, ctx, info) => {
            var _a, _b, _c;
            this.maybeLogToSplunk({
                headers: ctx.request.headers,
                name,
                query: ((_a = ctx.graphql.query) === null || _a === void 0 ? void 0 : _a.document) && graphql_1.print((_b = ctx.graphql.query) === null || _b === void 0 ? void 0 : _b.document),
                reason,
                variables: (_c = ctx.graphql.query) === null || _c === void 0 ? void 0 : _c.variables,
            }, ctx.vtex.logger);
            return resolve(root, args, ctx, info);
        };
    }
    maybeLogToSplunk(payload, logger = listeners_1.logger) {
        const now = process.hrtime();
        const timeSinceLastLog = hrtimeToS([
            now[0] - lastLog[0],
            now[1] - lastLog[1],
        ]);
        if (timeSinceLastLog > LOG_PERIOD_S) {
            lastLog = now;
            logger.warn({
                message: 'Deprecated field in use',
                ...payload,
            });
        }
    }
}
exports.Deprecated = Deprecated;
exports.deprecatedDirectiveTypeDefs = `
directive @deprecated(
  reason: String = "No longer supported"
) on
    FIELD_DEFINITION
  | INPUT_FIELD_DEFINITION
  | ARGUMENT_DEFINITION
  | FRAGMENT_DEFINITION
`;

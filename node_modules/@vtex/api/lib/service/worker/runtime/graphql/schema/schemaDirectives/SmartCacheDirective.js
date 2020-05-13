"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const graphql_tools_1 = require("graphql-tools");
const constants_1 = require("../../../../../../constants");
const ETAG_CONTROL_HEADER = 'x-vtex-etag-control';
const DEFAULT_ARGS = {
    maxAge: undefined,
};
class SmartCacheDirective extends graphql_tools_1.SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        const { resolve = graphql_1.defaultFieldResolver } = field;
        const { maxAge } = this.args || DEFAULT_ARGS;
        const maxAgeS = maxAge && constants_1.MAX_AGE[maxAge];
        field.resolve = (root, args, context, info) => {
            if (maxAgeS) {
                context.set(ETAG_CONTROL_HEADER, `public, max-age=${maxAgeS}`);
            }
            context.vtex.recorder = context.state.recorder;
            return resolve(root, args, context, info);
        };
    }
}
exports.SmartCacheDirective = SmartCacheDirective;
exports.smartCacheDirectiveTypeDefs = `
directive @smartcache(
  maxAge: String
) on FIELD_DEFINITION
`;

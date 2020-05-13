"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const graphql_tools_1 = require("graphql-tools");
class CacheControl extends graphql_tools_1.SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        const { resolve = graphql_1.defaultFieldResolver } = field;
        const { maxAge: directiveMaxAge, scope: directiveScope, } = this.args;
        field.resolve = (root, args, ctx, info) => {
            const { maxAge, scope, } = ctx.graphql.cacheControl;
            if (Number.isInteger(directiveMaxAge) && directiveMaxAge < maxAge) {
                ctx.graphql.cacheControl.maxAge = directiveMaxAge;
            }
            if (directiveScope === 'PRIVATE') {
                ctx.graphql.cacheControl.scope = 'private';
            }
            else if (directiveScope === 'SEGMENT' && scope === 'public') {
                ctx.graphql.cacheControl.scope = 'segment';
            }
            return resolve(root, args, ctx, info);
        };
    }
}
exports.CacheControl = CacheControl;
exports.cacheControlDirectiveTypeDefs = `

enum IOCacheControlScope {
  SEGMENT
  PUBLIC
  PRIVATE
}

directive @cacheControl(
  maxAge: Int
  scope: IOCacheControlScope
) on FIELD_DEFINITION
`;

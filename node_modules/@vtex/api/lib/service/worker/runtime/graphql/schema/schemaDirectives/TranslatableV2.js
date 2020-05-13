"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const graphql_tools_1 = require("graphql-tools");
const messagesLoaderV2_1 = require("../messagesLoaderV2");
const CONTEXT_REGEX = /\(\(\((?<context>(.)*)\)\)\)/;
const FROM_REGEX = /\<\<\<(?<from>(.)*)\>\>\>/;
const CONTENT_REGEX = /\(\(\((?<context>(.)*)\)\)\)|\<\<\<(?<from>(.)*)\>\>\>/g;
class TranslatableV2 extends graphql_tools_1.SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        const { resolve = graphql_1.defaultFieldResolver } = field;
        const { behavior = 'FULL', withAppsMetaInfo = false } = this.args;
        field.resolve = async (root, args, ctx, info) => {
            var _a;
            if (!((_a = ctx.loaders) === null || _a === void 0 ? void 0 : _a.messagesV2)) {
                const { vtex: { locale: to } } = ctx;
                if (to == null) {
                    throw new Error('@translatableV2 directive needs the locale variable available in IOContext. You can do this by either setting \`ctx.vtex.locale\` directly or calling this app with \`x-vtex-locale\` header');
                }
                const dependencies = withAppsMetaInfo ? await ctx.clients.apps.getAppsMetaInfos() : undefined;
                ctx.loaders = {
                    ...ctx.loaders,
                    messagesV2: messagesLoaderV2_1.createMessagesLoader(ctx.clients, to, dependencies),
                };
            }
            const response = await resolve(root, args, ctx, info);
            const { vtex, loaders: { messagesV2 } } = ctx;
            const handler = handleSingleString(vtex, messagesV2, behavior);
            return Array.isArray(response)
                ? Promise.all(response.map(handler))
                : handler(response);
        };
    }
}
exports.TranslatableV2 = TranslatableV2;
exports.parseTranslatableStringV2 = (rawMessage) => {
    var _a, _b, _c, _d;
    const context = (_b = (_a = rawMessage.match(CONTEXT_REGEX)) === null || _a === void 0 ? void 0 : _a.groups) === null || _b === void 0 ? void 0 : _b.context;
    const from = (_d = (_c = rawMessage.match(FROM_REGEX)) === null || _c === void 0 ? void 0 : _c.groups) === null || _d === void 0 ? void 0 : _d.from;
    const content = rawMessage.replace(CONTENT_REGEX, '');
    return {
        content: content === null || content === void 0 ? void 0 : content.trim(),
        context: context === null || context === void 0 ? void 0 : context.trim(),
        from: from === null || from === void 0 ? void 0 : from.trim(),
    };
};
exports.formatTranslatableStringV2 = ({ from, content, context }) => `${content} ${context ? `(((${context})))` : ''} ${from ? `<<<${from}>>>` : ''}`;
const handleSingleString = (ctx, messagesV2, behavior) => async (rawMessage) => {
    // Messages only knows how to process non empty strings.
    if (rawMessage == null) {
        return rawMessage;
    }
    const { content, context, from: maybeFrom } = exports.parseTranslatableStringV2(rawMessage);
    const { binding, tenant } = ctx;
    if (content == null) {
        throw new Error(`@translatableV2 directive needs a content to translate, but received ${JSON.stringify(rawMessage)}`);
    }
    const from = maybeFrom || (binding === null || binding === void 0 ? void 0 : binding.locale) || (tenant === null || tenant === void 0 ? void 0 : tenant.locale);
    if (from == null) {
        throw new Error('@translatableV2 directive needs a source language to translate from. You can do this by either setting \`ctx.vtex.tenant\` variable, call this app with the header \`x-vtex-tenant\` or format the string with the \`formatTranslatableStringV2\` function with the \`from\` option set');
    }
    return messagesV2.load({
        behavior,
        content,
        context,
        from,
    });
};
exports.translatableV2DirectiveTypeDefs = `
directive @translatableV2(
  behavior: String
  withAppsMetaInfo: Boolean
) on FIELD_DEFINITION
`;

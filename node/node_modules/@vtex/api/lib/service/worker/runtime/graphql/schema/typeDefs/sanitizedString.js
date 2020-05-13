"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const xss_1 = require("xss");
const defaultName = 'IOSanitizedString';
exports.scalar = defaultName;
const noop = (html) => html;
const serialize = (input, options) => {
    return xss_1.filterXSS(input, options);
};
const parseValue = (value, options) => {
    return xss_1.filterXSS(value, options);
};
class IOSanitizedStringType extends graphql_1.GraphQLScalarType {
    constructor(options) {
        const allowHTMLTags = options && options.allowHTMLTags;
        const stripIgnoreTag = !options || options.stripIgnoreTag !== false;
        const xssOptions = {
            stripIgnoreTag,
            ...!allowHTMLTags && { whiteList: [] },
            ...stripIgnoreTag && { escapeHtml: noop },
        };
        super({
            name: options ? `Custom${defaultName}` : defaultName,
            parseLiteral: ast => {
                switch (ast.kind) {
                    case graphql_1.Kind.STRING:
                        return parseValue(ast.value, xssOptions);
                    default:
                        return null;
                }
            },
            parseValue: value => parseValue(value, xssOptions),
            serialize: value => serialize(value, xssOptions),
        });
    }
}
exports.IOSanitizedStringType = IOSanitizedStringType;
exports.resolvers = new IOSanitizedStringType();

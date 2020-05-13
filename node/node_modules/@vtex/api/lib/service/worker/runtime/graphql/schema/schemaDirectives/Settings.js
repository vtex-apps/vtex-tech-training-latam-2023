"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const graphql_tools_1 = require("graphql-tools");
const settings_1 = require("../../../http/middlewares/settings");
const addSettings = async (settings, ctx) => {
    if (settings === 'pure') {
        return ctx;
    }
    const { clients: { apps, assets } } = ctx;
    const dependenciesSettings = await settings_1.getDependenciesSettings(apps, assets);
    if (!ctx.vtex) {
        ctx.vtex = {};
    }
    ctx.vtex.settings = { ...ctx.vtex.settings, dependenciesSettings };
};
class SettingsDirective extends graphql_tools_1.SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        const { resolve = graphql_1.defaultFieldResolver } = field;
        const { settingsType } = this.args;
        field.resolve = async (root, args, ctx, info) => {
            if (settingsType) {
                await addSettings(settingsType, ctx);
            }
            return resolve(root, args, ctx, info);
        };
    }
}
exports.SettingsDirective = SettingsDirective;
exports.settingsDirectiveTypeDefs = `
directive @settings(
  settingsType: String
) on FIELD_DEFINITION
`;

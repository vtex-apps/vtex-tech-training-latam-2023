"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Auth_1 = require("./Auth");
const CacheControl_1 = require("./CacheControl");
const Deprecated_1 = require("./Deprecated");
const Sanitize_1 = require("./Sanitize");
const Settings_1 = require("./Settings");
const SmartCacheDirective_1 = require("./SmartCacheDirective");
const TranslatableV2_1 = require("./TranslatableV2");
var TranslatableV2_2 = require("./TranslatableV2");
exports.parseTranslatableStringV2 = TranslatableV2_2.parseTranslatableStringV2;
exports.formatTranslatableStringV2 = TranslatableV2_2.formatTranslatableStringV2;
exports.nativeSchemaDirectives = {
    auth: Auth_1.Auth,
    cacheControl: CacheControl_1.CacheControl,
    deprecated: Deprecated_1.Deprecated,
    sanitize: Sanitize_1.SanitizeDirective,
    settings: Settings_1.SettingsDirective,
    smartcache: SmartCacheDirective_1.SmartCacheDirective,
    translatableV2: TranslatableV2_1.TranslatableV2,
};
exports.nativeSchemaDirectivesTypeDefs = [
    Auth_1.authDirectiveTypeDefs,
    CacheControl_1.cacheControlDirectiveTypeDefs,
    Deprecated_1.deprecatedDirectiveTypeDefs,
    Sanitize_1.sanitizeDirectiveTypeDefs,
    Settings_1.settingsDirectiveTypeDefs,
    SmartCacheDirective_1.smartCacheDirectiveTypeDefs,
    TranslatableV2_1.translatableV2DirectiveTypeDefs,
].join('\n\n');

import { Auth } from './Auth';
import { CacheControl } from './CacheControl';
import { Deprecated } from './Deprecated';
import { SanitizeDirective } from './Sanitize';
import { SettingsDirective } from './Settings';
import { SmartCacheDirective } from './SmartCacheDirective';
import { TranslatableV2 } from './TranslatableV2';
export { parseTranslatableStringV2, formatTranslatableStringV2 } from './TranslatableV2';
export declare const nativeSchemaDirectives: {
    auth: typeof Auth;
    cacheControl: typeof CacheControl;
    deprecated: typeof Deprecated;
    sanitize: typeof SanitizeDirective;
    settings: typeof SettingsDirective;
    smartcache: typeof SmartCacheDirective;
    translatableV2: typeof TranslatableV2;
};
export declare const nativeSchemaDirectivesTypeDefs: string;

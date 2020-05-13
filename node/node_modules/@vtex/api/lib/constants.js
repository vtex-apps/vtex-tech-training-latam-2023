"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./utils/app");
// tslint:disable-next-line
const pkg = require('../package.json');
exports.NODE_VTEX_API_VERSION = pkg.version;
exports.DEFAULT_WORKSPACE = 'master';
exports.IS_IO = process.env.VTEX_IO;
exports.PID = process.pid;
exports.CACHE_CONTROL_HEADER = 'cache-control';
exports.SEGMENT_HEADER = 'x-vtex-segment';
exports.SESSION_HEADER = 'x-vtex-session';
exports.PRODUCT_HEADER = 'x-vtex-product';
exports.LOCALE_HEADER = 'x-vtex-locale';
exports.FORWARDED_HOST_HEADER = 'x-forwarded-host';
exports.TENANT_HEADER = 'x-vtex-tenant';
exports.BINDING_HEADER = 'x-vtex-binding';
exports.META_HEADER = 'x-vtex-meta';
exports.META_HEADER_BUCKET = 'x-vtex-meta-bucket';
exports.ETAG_HEADER = 'etag';
exports.ACCOUNT_HEADER = 'x-vtex-account';
exports.CREDENTIAL_HEADER = 'x-vtex-credential';
exports.REQUEST_ID_HEADER = 'x-request-id';
exports.ROUTER_CACHE_HEADER = 'x-router-cache';
exports.OPERATION_ID_HEADER = 'x-vtex-operation-id';
exports.PLATFORM_HEADER = 'x-vtex-platform';
exports.WORKSPACE_IS_PRODUCTION_HEADER = 'x-vtex-workspace-is-production';
exports.WORKSPACE_HEADER = 'x-vtex-workspace';
exports.EVENT_KEY_HEADER = 'x-event-key';
exports.EVENT_SENDER_HEADER = 'x-event-sender';
exports.EVENT_SUBJECT_HEADER = 'x-event-subject';
exports.EVENT_HANDLER_ID_HEADER = 'x-event-handler-id';
exports.COLOSSUS_ROUTE_DECLARER_HEADER = 'x-colossus-route-declarer';
exports.COLOSSUS_ROUTE_ID_HEADER = 'x-colossus-route-id';
exports.COLOSSUS_PARAMS_HEADER = 'x-colossus-params';
exports.TRACE_ID_HEADER = 'x-trace-id';
exports.BODY_HASH = '__graphqlBodyHash';
exports.UP_SIGNAL = 'UP';
exports.MAX_AGE = {
    LONG: 86400,
    MEDIUM: 3600,
    SHORT: 120,
};
exports.HTTP_SERVER_PORT = 5050;
exports.MAX_WORKERS = 4;
exports.LINKED = !!process.env.VTEX_APP_LINK;
exports.REGION = process.env.VTEX_REGION;
exports.PUBLIC_ENDPOINT = process.env.VTEX_PUBLIC_ENDPOINT || 'myvtex.com';
exports.APP = {
    ID: process.env.VTEX_APP_ID,
    MAJOR: process.env.VTEX_APP_VERSION ? app_1.versionToMajor(process.env.VTEX_APP_VERSION) : '',
    NAME: process.env.VTEX_APP_NAME,
    VENDOR: process.env.VTEX_APP_VENDOR,
    VERSION: process.env.VTEX_APP_VERSION,
    IS_THIRD_PARTY() {
        return 'vtex' !== this.VENDOR && 'gocommerce' !== this.VENDOR;
    },
};
exports.NODE_ENV = process.env.NODE_ENV;
exports.ACCOUNT = process.env.VTEX_ACCOUNT;
exports.WORKSPACE = process.env.VTEX_WORKSPACE;
exports.PRODUCTION = process.env.VTEX_PRODUCTION === 'true';
exports.INSPECT_DEBUGGER_PORT = 5858;
exports.cancellableMethods = new Set(['GET', 'OPTIONS', 'HEAD']);

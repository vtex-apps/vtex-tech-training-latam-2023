"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v4_1 = __importDefault(require("uuid/v4"));
const constants_1 = require("../../../../constants");
const UserLandTracer_1 = require("../../../../tracing/UserLandTracer");
const tenant_1 = require("../../../../utils/tenant");
const logger_1 = require("../../../logger");
const binding_1 = require("./../../../../utils/binding");
const getPlatform = (account) => {
    return account.startsWith('gc-') ? 'gocommerce' : 'vtex';
};
exports.prepareHandlerCtx = (header, tracingContext) => {
    var _a;
    const partialContext = {
        account: header[constants_1.ACCOUNT_HEADER],
        authToken: header[constants_1.CREDENTIAL_HEADER],
        binding: header[constants_1.BINDING_HEADER] ? binding_1.parseBindingHeaderValue(header[constants_1.BINDING_HEADER]) : undefined,
        host: header[constants_1.FORWARDED_HOST_HEADER],
        locale: header[constants_1.LOCALE_HEADER],
        operationId: header[constants_1.OPERATION_ID_HEADER] || v4_1.default(),
        platform: header[constants_1.PLATFORM_HEADER] || getPlatform(header[constants_1.ACCOUNT_HEADER]),
        product: header[constants_1.PRODUCT_HEADER],
        production: ((_a = header[constants_1.WORKSPACE_IS_PRODUCTION_HEADER]) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'true' || false,
        region: constants_1.REGION,
        requestId: header[constants_1.REQUEST_ID_HEADER],
        segmentToken: header[constants_1.SEGMENT_HEADER],
        sessionToken: header[constants_1.SESSION_HEADER],
        tenant: header[constants_1.TENANT_HEADER] ? tenant_1.parseTenantHeaderValue(header[constants_1.TENANT_HEADER]) : undefined,
        tracer: new UserLandTracer_1.UserLandTracer(tracingContext.tracer, tracingContext.currentSpan),
        userAgent: process.env.VTEX_APP_ID || '',
        workspace: header[constants_1.WORKSPACE_HEADER],
    };
    return {
        ...partialContext,
        logger: new logger_1.Logger(partialContext),
    };
};

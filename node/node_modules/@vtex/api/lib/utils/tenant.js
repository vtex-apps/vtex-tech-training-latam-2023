"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatTenantHeaderValue = (tenant) => tenant.locale;
exports.parseTenantHeaderValue = (value) => ({
    locale: value,
});

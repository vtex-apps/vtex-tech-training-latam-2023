"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
exports.isFreeBillingOptions = (billingOptions) => billingOptions.free || billingOptions.type === 'free';
exports.isFixedCalculationItem = (item) => !ramda_1.isNil(item.fixed);

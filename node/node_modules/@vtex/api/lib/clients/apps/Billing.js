"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppClient_1 = require("./AppClient");
class Billing extends AppClient_1.AppClient {
    constructor(context, options) {
        super('vtex.billing@0.x', context, options);
        this.status = (tracingConfig) => this.http.get('/_v/contractStatus', {
            tracing: {
                requestSpanNameSuffix: 'billing-status',
                ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
            },
        });
    }
}
exports.Billing = Billing;
var ContractStatus;
(function (ContractStatus) {
    ContractStatus["ACTIVE"] = "active_contract";
    ContractStatus["INACTIVE"] = "inactive_contract";
    ContractStatus["NO_CONTRACT"] = "no_contract";
})(ContractStatus = exports.ContractStatus || (exports.ContractStatus = {}));

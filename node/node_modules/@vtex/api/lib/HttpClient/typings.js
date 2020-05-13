"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AuthType;
(function (AuthType) {
    AuthType["basic"] = "Basic";
    AuthType["bearer"] = "Bearer";
    /**
     * Supported for legacy reasons - this is not spec compliant!
     */
    AuthType["token"] = "token";
})(AuthType = exports.AuthType || (exports.AuthType = {}));

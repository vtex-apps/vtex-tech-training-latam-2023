"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const agentkeepalive_1 = __importStar(require("agentkeepalive"));
exports.createHttpAgent = (opts) => new agentkeepalive_1.default({
    ...opts,
    freeSocketTimeout: 15 * 1000,
    keepAlive: true,
    maxFreeSockets: 50,
});
exports.createHttpsAgent = (opts) => new agentkeepalive_1.HttpsAgent({
    ...opts,
    freeSocketTimeout: 15 * 1000,
    keepAlive: true,
    maxFreeSockets: 50,
});

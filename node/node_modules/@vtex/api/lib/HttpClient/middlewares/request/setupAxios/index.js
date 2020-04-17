"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const HttpAgentSingleton_1 = require("../HttpAgentSingleton");
const interceptors_1 = require("./interceptors");
exports.getConfiguredAxios = () => {
    const httpAgent = HttpAgentSingleton_1.HttpAgentSingleton.getHttpAgent();
    const http = axios_1.default.create({
        httpAgent,
    });
    interceptors_1.addTracingPreRequestInterceptor(http);
    // Do not change this order, otherwise each request span will
    // wait all retries to finish before finishing the span 
    interceptors_1.addTracingResponseInterceptor(http);
    interceptors_1.addExponentialBackoffResponseInterceptor(http);
    return http;
};

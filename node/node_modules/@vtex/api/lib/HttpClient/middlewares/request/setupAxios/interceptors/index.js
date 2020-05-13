"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var exponentialBackoff_1 = require("./exponentialBackoff");
exports.addExponentialBackoffResponseInterceptor = exponentialBackoff_1.addExponentialBackoffResponseInterceptor;
var tracing_1 = require("./tracing");
exports.addTracingPreRequestInterceptor = tracing_1.addTracingPreRequestInterceptor;
exports.addTracingResponseInterceptor = tracing_1.addTracingResponseInterceptor;

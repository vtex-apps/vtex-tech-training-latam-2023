"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpClient_1 = require("../HttpClient/HttpClient");
/**
 * A client that can be instantiated by the Serviceruntime layer.
 */
class IOClient {
    constructor(context, options) {
        this.context = context;
        this.options = options;
        this.http = new HttpClient_1.HttpClient({
            name: this.constructor.name,
            ...context,
            ...options,
            metrics: options && options.metrics,
        });
    }
}
exports.IOClient = IOClient;

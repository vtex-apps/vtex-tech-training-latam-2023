"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = require("os");
const path_1 = require("path");
const IOClients_1 = require("../clients/IOClients");
const constants_1 = require("../constants");
exports.appPath = path_1.join(process.cwd(), './service/src/node/');
exports.bundlePath = path_1.join(exports.appPath, 'index');
exports.serviceJsonPath = path_1.join(process.cwd(), './service/service.json');
const getWorkers = (workers) => {
    // We need to have only one worker while linking so the debugger
    // works properly
    if (constants_1.LINKED) {
        return 1;
    }
    // If user didn't set workers property, let's use the cpu count
    const workersFromUser = workers && Number.isInteger(workers) ? workers : os_1.cpus().length;
    // never spawns more than MAX_WORKERS
    return Math.min(workersFromUser, constants_1.MAX_WORKERS);
};
exports.getServiceJSON = () => {
    const service = require(exports.serviceJsonPath);
    return {
        ...service,
        workers: getWorkers(service.workers),
    };
};
const defaultClients = {
    options: {
        messages: {
            concurrency: 10,
            retries: 2,
            timeout: 1000,
        },
        messagesGraphQL: {
            concurrency: 10,
            retries: 2,
            timeout: 1000,
        },
    },
};
exports.getService = () => {
    var _a;
    const { default: service } = require(exports.bundlePath);
    const { config: { clients } } = service;
    service.config.clients = {
        implementation: (_a = clients === null || clients === void 0 ? void 0 : clients.implementation) !== null && _a !== void 0 ? _a : IOClients_1.IOClients,
        options: {
            ...defaultClients.options,
            ...clients === null || clients === void 0 ? void 0 : clients.options,
        },
    };
    return service;
};

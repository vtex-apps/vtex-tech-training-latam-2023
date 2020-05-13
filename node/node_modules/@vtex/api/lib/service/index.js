"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cluster_1 = __importDefault(require("cluster"));
const constants_1 = require("../constants");
const loaders_1 = require("./loaders");
const logger_1 = require("./logger");
const master_1 = require("./master");
const worker_1 = require("./worker");
exports.startApp = () => {
    const serviceJSON = loaders_1.getServiceJSON();
    try {
        // if it is a master process then call setting up worker process
        if (cluster_1.default.isMaster) {
            master_1.startMaster(serviceJSON);
        }
        else {
            // to setup server configurations and share port address for incoming requests
            worker_1.startWorker(serviceJSON).listen(constants_1.HTTP_SERVER_PORT);
        }
    }
    catch (err) {
        logger_1.logOnceToDevConsole(err.stack || err.message, logger_1.LogLevel.Error);
        process.exit(2);
    }
};
var loaders_2 = require("./loaders");
exports.appPath = loaders_2.appPath;

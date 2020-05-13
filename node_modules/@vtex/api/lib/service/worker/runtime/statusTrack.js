"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cluster_1 = __importDefault(require("cluster"));
const constants_1 = require("../../../constants");
const BROADCAST_STATUS_TRACK = 'broadcastStatusTrack';
const STATUS_TRACK = 'statusTrack';
exports.isStatusTrack = (message) => message === STATUS_TRACK;
exports.isStatusTrackBroadcast = (message) => message === BROADCAST_STATUS_TRACK;
exports.statusTrackHandler = async (ctx) => {
    var _a, _b;
    (_a = ctx.tracing) === null || _a === void 0 ? void 0 : _a.currentSpan.setOperationName('builtin:status-track');
    if (!constants_1.LINKED) {
        (_b = process.send) === null || _b === void 0 ? void 0 : _b.call(process, BROADCAST_STATUS_TRACK);
    }
    ctx.body = [];
    return;
};
exports.trackStatus = () => {
    global.metrics.statusTrack().forEach(status => {
        logStatus(status);
    });
};
exports.broadcastStatusTrack = () => Object.values(cluster_1.default.workers).forEach(worker => worker === null || worker === void 0 ? void 0 : worker.send(STATUS_TRACK));
const logStatus = (status) => console.log(JSON.stringify({
    __VTEX_IO_LOG: true,
    account: constants_1.ACCOUNT,
    app: constants_1.APP.ID,
    isLink: constants_1.LINKED,
    pid: process.pid,
    production: constants_1.PRODUCTION,
    status,
    type: 'metric/status',
    workspace: constants_1.WORKSPACE,
}));

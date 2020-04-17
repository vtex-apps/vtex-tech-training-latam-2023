"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function cpuSnapshot() {
    return {
        time: microtime(),
        usage: process.cpuUsage(),
    };
}
exports.cpuSnapshot = cpuSnapshot;
function snapshotDiff(curr, last) {
    const timeDiff = curr.time - last.time;
    return {
        system: (curr.usage.system - last.usage.system) / timeDiff,
        user: (curr.usage.user - last.usage.user) / timeDiff,
    };
}
exports.snapshotDiff = snapshotDiff;
function microtime() {
    const hrTime = process.hrtime();
    return hrTime[0] * 1000000 + hrTime[1] / 1000;
}

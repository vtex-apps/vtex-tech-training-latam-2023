"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fast_json_stable_stringify_1 = __importDefault(require("fast-json-stable-stringify"));
const ramda_1 = require("ramda");
const stats_lite_1 = require("stats-lite");
const constants_1 = require("../../constants");
const diff_1 = require("../worker/runtime/utils/diff");
const runtimeBaseDefaultMetricNames = ['routeStats'];
const runtimeNodeDefaultMetricNames = {
    cpuUsage: 'cpuUsage',
    memoryUsage: 'memoryUsage',
};
const invalidMetricNames = runtimeBaseDefaultMetricNames.concat(Object.values(runtimeNodeDefaultMetricNames));
class MetricsLogger {
    constructor() {
        //////////////////////
        // private attributes
        //////////////////////
        let samples = {};
        let lastCpu = diff_1.cpuSnapshot();
        //////////////////////
        // private methods definitions
        //////////////////////
        const summaries = ramda_1.compose(ramda_1.reject(ramda_1.isNil), ramda_1.values, ramda_1.mapObjIndexed(getSummary));
        function getDefaultStoredashProperties() {
            return {
                Count: 1,
                Max: 0,
                Min: 0,
                Name: 'runtime',
                Sum: 0,
                Timestamp: (new Date()).getTime(),
                Unit: '',
            };
        }
        function getProcessEnv() {
            return {
                appName: process.env.VTEX_APP_NAME || '',
                appVersion: process.env.VTEX_APP_VERSION || '',
                production: constants_1.PRODUCTION,
                region: process.env.VTEX_REGION || '',
                vendor: process.env.VTEX_APP_VENDOR || '',
            };
        }
        function getCpuUsage() {
            const cpu = diff_1.cpuSnapshot();
            const cpuDiff = diff_1.snapshotDiff(cpu, lastCpu);
            lastCpu = cpu;
            const metric = {
                Data: {
                    key: {
                        name: runtimeNodeDefaultMetricNames.cpuUsage,
                    },
                    processEnv: getProcessEnv(),
                    summary: cpuDiff,
                },
                ...getDefaultStoredashProperties(),
            };
            return metric;
        }
        function getMemoryUsage() {
            const metric = {
                Data: {
                    key: {
                        name: runtimeNodeDefaultMetricNames.memoryUsage,
                    },
                    processEnv: getProcessEnv(),
                    summary: process.memoryUsage(),
                },
                ...getDefaultStoredashProperties(),
            };
            return metric;
        }
        function getRuntimeSummaries() {
            return [getCpuUsage(), getMemoryUsage()];
        }
        function getSummary(vals, strKey) {
            if (strKey in samples) {
                const summary = getNumericSummary(vals);
                const keyObj = JSON.parse(strKey);
                const metric = {
                    Data: {
                        key: keyObj,
                        processEnv: getProcessEnv(),
                        summary,
                    },
                    ...getDefaultStoredashProperties(),
                };
                return metric;
            }
            return null;
        }
        // TODO: create some kind of alert/log if metric is not valid
        function validKey(key) {
            if (!('name' in key)) {
                return false;
            }
            if (invalidMetricNames.includes(key.name)) {
                return false;
            }
            try {
                fast_json_stable_stringify_1.default(key);
            }
            catch {
                return false;
            }
            return true;
        }
        function getStrKey(key) {
            return fast_json_stable_stringify_1.default(key);
        }
        function getNumericSummary(vals) {
            return {
                count: vals.length,
                max: Math.max(...vals),
                median: stats_lite_1.median(vals),
                min: Math.min(...vals),
                percentile95: stats_lite_1.percentile(vals, 0.95),
                percentile99: stats_lite_1.percentile(vals, 0.99),
                sum: stats_lite_1.sum(vals),
            };
        }
        //////////////////////
        // public methods definitions
        //////////////////////
        this.add = (key, value) => {
            if (validKey(key)) {
                const strKey = getStrKey(key);
                if (!(strKey in samples)) {
                    samples[strKey] = [];
                }
                samples[strKey].push(value);
            }
        };
        this.getSummaries = () => {
            const appSummaries = summaries(samples);
            samples = {};
            const runtimeSummaries = getRuntimeSummaries();
            return runtimeSummaries.concat(appSummaries);
        };
        //////////////////////
        // real constructor
        //////////////////////
    }
}
exports.MetricsLogger = MetricsLogger;

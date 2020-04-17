"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
const stats_lite_1 = require("stats-lite");
const HttpAgentSingleton_1 = require("../HttpClient/middlewares/request/HttpAgentSingleton");
const requestStats_1 = require("../service/worker/runtime/http/middlewares/requestStats");
const time_1 = require("../utils/time");
// Production pods never handle development workspaces and vice-versa.
const production = process.env.VTEX_PRODUCTION === 'true';
let lastCpu = process.cpuUsage();
function cpuUsage() {
    const diff = process.cpuUsage(lastCpu);
    lastCpu = {
        system: lastCpu.system + diff.system,
        user: lastCpu.user + diff.user,
    };
    return diff;
}
function getIncomingRequestStats() {
    const stats = requestStats_1.incomingRequestStats.get();
    requestStats_1.incomingRequestStats.clear();
    return stats;
}
class MetricsAccumulator {
    constructor() {
        this.batchMetric = (name, timeMillis, extensions) => {
            if (!this.metricsMillis[name]) {
                this.metricsMillis[name] = [];
            }
            if (timeMillis != null) {
                this.metricsMillis[name].push(timeMillis);
            }
            if (extensions) {
                if (!this.extensions[name]) {
                    this.extensions[name] = {};
                }
                for (const [key, value] of Object.entries(extensions)) {
                    const existing = this.extensions[name][key];
                    if (typeof value === 'string' || typeof existing === 'string') {
                        this.extensions[name][key] = value;
                    }
                    else if (typeof value === 'number') {
                        this.extensions[name][key] = (existing || 0) + value;
                    }
                }
            }
        };
        /**
         * Batches a named metric which took `diffNs`.
         *
         * @param name Metric label.
         * @param diffNs The result of calling process.hrtime() passing a previous process.hrtime() value.
         * @param extensions Any other relevant properties of this metric.
         *
         * @see https://nodejs.org/api/process.html#process_process_hrtime_time
         */
        this.batch = (name, diffNs, extensions) => {
            this.batchMetric(name, diffNs ? time_1.hrToMillis(diffNs) : undefined, extensions);
        };
        this.addOnFlushMetric = (metricFn) => {
            this.onFlushMetrics.push(metricFn);
        };
        this.trackCache = (name, cacheInstance) => {
            this.cacheMap[name] = cacheInstance;
        };
        this.statusTrack = () => {
            return this.flushMetrics();
        };
        this.metricToAggregate = (value, key) => {
            const aggregate = {
                name: key,
                count: value.length,
                max: Math.max(...value),
                mean: stats_lite_1.mean(value),
                median: stats_lite_1.median(value),
                percentile95: stats_lite_1.percentile(value, 0.95),
                percentile99: stats_lite_1.percentile(value, 0.99),
                production,
                ...this.extensions[key],
            };
            delete this.metricsMillis[key];
            delete this.extensions[key];
            return aggregate;
        };
        this.cacheToMetric = (value, key) => ({
            ...value.getStats(),
            name: `${key}-cache`,
            production,
        });
        this.flushMetrics = () => {
            const aggregateMetrics = ramda_1.values(ramda_1.mapObjIndexed(this.metricToAggregate, this.metricsMillis));
            const systemMetrics = [
                {
                    ...cpuUsage(),
                    name: 'cpu',
                    production,
                },
                {
                    ...process.memoryUsage(),
                    name: 'memory',
                    production,
                },
                {
                    ...HttpAgentSingleton_1.HttpAgentSingleton.httpAgentStats(),
                    name: 'httpAgent',
                    production,
                },
                {
                    ...getIncomingRequestStats(),
                    name: 'incomingRequest',
                    production,
                },
            ];
            const onFlushMetrics = ramda_1.flatten(ramda_1.map(getMetric => getMetric(), this.onFlushMetrics));
            const envFlushMetric = ramda_1.map(ramda_1.assoc('production', production), onFlushMetrics);
            const cacheMetrics = ramda_1.values(ramda_1.mapObjIndexed(this.cacheToMetric, this.cacheMap));
            return [...systemMetrics, ...aggregateMetrics, ...envFlushMetric, ...cacheMetrics];
        };
        this.metricsMillis = {};
        this.extensions = {};
        this.onFlushMetrics = [];
        this.cacheMap = {};
    }
}
exports.MetricsAccumulator = MetricsAccumulator;

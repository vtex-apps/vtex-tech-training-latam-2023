"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
const agents_1 = require("../../agents");
class HttpAgentSingleton {
    static getHttpAgent() {
        if (!HttpAgentSingleton.httpAgent) {
            HttpAgentSingleton.httpAgent = agents_1.createHttpAgent();
        }
        return HttpAgentSingleton.httpAgent;
    }
    static httpAgentStats() {
        const socketsPerOrigin = HttpAgentSingleton.countPerOrigin(HttpAgentSingleton.httpAgent.sockets);
        const sockets = ramda_1.sum(ramda_1.values(socketsPerOrigin));
        const freeSocketsPerOrigin = HttpAgentSingleton.countPerOrigin(HttpAgentSingleton.httpAgent.freeSockets);
        const freeSockets = ramda_1.sum(ramda_1.values(freeSocketsPerOrigin));
        const pendingRequestsPerOrigin = HttpAgentSingleton.countPerOrigin(HttpAgentSingleton.httpAgent.requests);
        const pendingRequests = ramda_1.sum(ramda_1.values(pendingRequestsPerOrigin));
        return {
            freeSockets,
            freeSocketsPerOrigin,
            pendingRequests,
            pendingRequestsPerOrigin,
            sockets,
            socketsPerOrigin,
        };
    }
    static countPerOrigin(obj) {
        try {
            return ramda_1.mapObjIndexed(val => val.length, obj);
        }
        catch (_) {
            return {};
        }
    }
}
exports.HttpAgentSingleton = HttpAgentSingleton;

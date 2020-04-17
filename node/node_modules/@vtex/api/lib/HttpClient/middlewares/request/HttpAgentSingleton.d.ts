import HttpAgent from 'agentkeepalive';
export declare class HttpAgentSingleton {
    static getHttpAgent(): HttpAgent;
    static httpAgentStats(): {
        freeSockets: number;
        freeSocketsPerOrigin: Record<string, number>;
        pendingRequests: number;
        pendingRequestsPerOrigin: Record<string, number>;
        sockets: number;
        socketsPerOrigin: Record<string, number>;
    };
    private static httpAgent;
    private static countPerOrigin;
}

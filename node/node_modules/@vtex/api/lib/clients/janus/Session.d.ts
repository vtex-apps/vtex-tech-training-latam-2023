import { RequestTracingConfig } from '../../HttpClient';
import { JanusClient } from './JanusClient';
export declare class Session extends JanusClient {
    /**
     * Get the session data using the given token
     */
    getSession: (token: string, items: string[], tracingConfig?: RequestTracingConfig | undefined) => Promise<{
        sessionData: any;
        sessionToken: string;
    }>;
    /**
     * Update the public portion of this session
     */
    updateSession: (key: string, value: any, items: string[], token: any, tracingConfig?: RequestTracingConfig | undefined) => Promise<void>;
}

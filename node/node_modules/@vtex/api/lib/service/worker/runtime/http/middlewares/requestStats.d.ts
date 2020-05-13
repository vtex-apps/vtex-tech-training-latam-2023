import { IOClients } from '../../../../../clients/IOClients';
import { ParamsContext, RecorderState, ServiceContext } from '../../typings';
export declare const cancelMessage = "Request cancelled";
declare class IncomingRequestStats {
    aborted: number;
    closed: number;
    total: number;
    get(): {
        aborted: number;
        closed: number;
        total: number;
    };
    clear(): void;
}
export declare const incomingRequestStats: IncomingRequestStats;
export declare function trackIncomingRequestStats<T extends IOClients, U extends RecorderState, V extends ParamsContext>(ctx: ServiceContext<T, U, V>, next: () => Promise<void>): Promise<void>;
export {};

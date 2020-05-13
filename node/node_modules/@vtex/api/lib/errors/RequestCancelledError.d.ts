export declare const cancelledRequestStatus = 499;
export declare const cancelledErrorCode = "request_cancelled";
export declare class RequestCancelledError extends Error {
    code: string;
    constructor(message: string);
}

import { InstanceOptions, IOContext, Maybe } from '../..';
import { RequestTracingConfig } from '../../HttpClient';
import { ExternalClient } from './ExternalClient';
export declare class PaymentProvider extends ExternalClient {
    protected context: IOContext;
    constructor(context: IOContext, options?: InstanceOptions);
    callback: (transactionId: string, paymentId: string, callback: AuthorizationCallback, tracingConfig?: RequestTracingConfig | undefined) => Promise<unknown>;
    inbound: <TRequest, TResponse>(transactionId: string, paymentId: string, action: string, payload: TRequest, tracingConfig?: RequestTracingConfig | undefined) => Promise<TResponse>;
}
export interface AuthorizationCallback {
    paymentId: string;
    status: string;
    tid: string;
    authorizationId?: Maybe<string>;
    nsu?: Maybe<string>;
    acquirer: string;
    paymentUrl?: Maybe<string>;
    paymentAppData?: Maybe<{
        appName: string;
        payload: string;
    }>;
    identificationNumber?: Maybe<string>;
    identificationNumberFormatted?: Maybe<string>;
    barCodeImageType?: Maybe<string>;
    barCodeImageNumber?: Maybe<string>;
    code?: Maybe<string>;
    message?: Maybe<string>;
    delayToAutoSettle?: Maybe<number>;
    delayToAutoSettleAfterAntifraud?: Maybe<number>;
    delayToCancel?: Maybe<number>;
}

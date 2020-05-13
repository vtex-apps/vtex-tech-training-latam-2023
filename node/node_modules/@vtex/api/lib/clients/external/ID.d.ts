import { InstanceOptions, RequestTracingConfig } from '../../HttpClient';
import { IOContext } from '../../service/worker/runtime/typings';
import { ExternalClient } from './ExternalClient';
export declare class ID extends ExternalClient {
    constructor(context: IOContext, opts?: InstanceOptions);
    getTemporaryToken: (tracingConfig?: RequestTracingConfig | undefined) => Promise<string>;
    sendCodeToEmail: (token: string, email: string, tracingConfig?: RequestTracingConfig | undefined) => Promise<any>;
    getEmailCodeAuthenticationToken: (token: string, email: string, code: string, tracingConfig?: RequestTracingConfig | undefined) => Promise<AuthenticationResponse>;
    getPasswordAuthenticationToken: (token: string, email: string, password: string, tracingConfig?: RequestTracingConfig | undefined) => Promise<AuthenticationResponse>;
}
export interface AuthenticationResponse {
    promptMFA: boolean;
    clientToken: any;
    authCookie: {
        Name: string;
        Value: string;
    };
    accountAuthCookie: any;
    expiresIn: number;
    userId: string;
    phoneNumber: string;
    scope: any;
}

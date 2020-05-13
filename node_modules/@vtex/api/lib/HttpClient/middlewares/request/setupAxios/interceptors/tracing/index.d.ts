import { AxiosInstance } from 'axios';
export declare const requestSpanPrefix = "http-request";
export declare const addTracingPreRequestInterceptor: (http: AxiosInstance) => {
    requestTracingInterceptor: number;
};
export declare const addTracingResponseInterceptor: (http: AxiosInstance) => {
    responseTracingInterceptor: number;
};

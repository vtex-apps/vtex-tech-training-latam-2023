import { Span } from 'opentracing';
export interface TraceInfo {
    traceId: string;
    isSampled: boolean;
}
export declare function getTraceInfo(span: Span): TraceInfo;

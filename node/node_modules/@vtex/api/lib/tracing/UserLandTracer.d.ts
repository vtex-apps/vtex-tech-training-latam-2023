import { Span, SpanContext, SpanOptions, Tracer } from 'opentracing';
export interface IUserLandTracer {
    traceId: string;
    isTraceSampled: boolean;
    startSpan: Tracer['startSpan'];
    inject: Tracer['inject'];
    fallbackSpanContext: () => SpanContext;
}
export declare const createTracingContextFromCarrier: (newSpanName: string, carrier: Record<string, any>) => {
    span: Span;
    tracer: IUserLandTracer;
};
export declare class UserLandTracer implements IUserLandTracer {
    private tracer;
    private fallbackSpan;
    private fallbackSpanLock;
    private _isSampled;
    private _traceId;
    constructor(tracer: Tracer, fallbackSpan: Span);
    get traceId(): string;
    get isTraceSampled(): boolean;
    lockFallbackSpan(): void;
    setFallbackSpan(newSpan: Span): void;
    startSpan(name: string, options?: SpanOptions): Span;
    inject(spanContext: SpanContext | Span, format: string, carrier: any): void;
    fallbackSpanContext(): SpanContext;
}

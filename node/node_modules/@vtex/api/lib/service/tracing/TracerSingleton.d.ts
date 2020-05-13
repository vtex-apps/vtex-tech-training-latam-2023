import { Tracer } from 'opentracing';
export declare class TracerSingleton {
    static getTracer(): Tracer;
    private static singleton;
    private static initServiceTracer;
    private static createJaegerTracer;
}

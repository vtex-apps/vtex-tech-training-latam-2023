import { IOClients } from '../clients/IOClients';
import { MetricsAccumulator } from '../metrics/MetricsAccumulator';
import { EventHandler, ParamsContext, RecorderState, RouteHandler } from '../service/worker/runtime/typings';
export declare const hrToMillis: ([seconds, nanoseconds]: [number, number]) => number;
export declare const hrToNano: ([seconds, nanoseconds]: [number, number]) => number;
export declare const formatNano: (nanoseconds: number) => string;
export declare const reduceHrToNano: (values: import("ramda").List<[number, number]>) => number;
export declare const shrinkTimings: (name: string) => string;
export declare const formatTimingName: ({ hopNumber, target, source }: {
    hopNumber: number | null;
    source: string | null;
    target: string | null;
}) => string;
export declare const parseTimingName: (timing: string | undefined) => {
    hopNumber: number | null;
    source: string | null;
    target: string | null;
};
export declare const reduceTimings: (timingsObj: Record<string, string>) => string;
export declare function timer<T extends IOClients, U extends RecorderState, V extends ParamsContext>(middleware: RouteHandler<T, U, V>): RouteHandler<T, U, V>;
export declare function timerForEvents<T extends IOClients, U>(middleware: EventHandler<T, U>): EventHandler<T, U>;
declare global {
    const metrics: MetricsAccumulator;
    namespace NodeJS {
        interface Global {
            metrics: MetricsAccumulator;
        }
    }
}

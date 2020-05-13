import Koa from 'koa';
import { MetricsAccumulator } from '../../metrics/MetricsAccumulator';
import { ServiceJSON } from './runtime/typings';
export declare const startWorker: (serviceJSON: ServiceJSON) => Koa<Koa.DefaultState, Koa.DefaultContext>;
declare global {
    namespace NodeJS {
        interface Global {
            metrics: MetricsAccumulator;
        }
    }
}

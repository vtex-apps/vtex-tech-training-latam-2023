import { MiddlewareContext } from '../typings';
import { Recorder } from './../../service/worker/runtime/utils/recorder';
export declare const recorderMiddleware: (recorder: Recorder) => (ctx: MiddlewareContext, next: () => Promise<void>) => Promise<void>;

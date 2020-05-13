import { Cancellation } from '../../service/worker/runtime/typings';
import { MiddlewareContext } from '../typings';
export declare const cancellationToken: (cancellation?: Cancellation | undefined) => (ctx: MiddlewareContext, next: () => Promise<void>) => Promise<void>;

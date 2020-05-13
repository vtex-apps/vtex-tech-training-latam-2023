import { InstanceOptions } from '../../HttpClient/typings';
import { IOContext } from '../../service/worker/runtime/typings';
import { IOClient } from '../IOClient';
/**
 * Used to perform calls on apps you declared a dependency for in your manifest.
 */
export declare class AppClient extends IOClient {
    constructor(app: string, context: IOContext, options?: InstanceOptions);
}

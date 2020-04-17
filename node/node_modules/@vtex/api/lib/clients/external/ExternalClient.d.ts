import { InstanceOptions } from '../../HttpClient/typings';
import { IOContext } from '../../service/worker/runtime/typings';
import { IOClient } from '../IOClient';
/**
 * Used to perform calls to external endpoints for which you have declared outbound access policies in your manifest.
 */
export declare class ExternalClient extends IOClient {
    constructor(baseURL: string, context: IOContext, options?: InstanceOptions);
}

import { InstanceOptions } from '../../HttpClient/typings';
import { IOContext } from '../../service/worker/runtime/typings';
import { IOGraphQLClient } from '../IOGraphQLClient';
/**
 * Used to perform calls on apps you declared a dependency for in your manifest.
 */
export declare class AppGraphQLClient extends IOGraphQLClient {
    constructor(app: string, context: IOContext, options?: InstanceOptions);
}

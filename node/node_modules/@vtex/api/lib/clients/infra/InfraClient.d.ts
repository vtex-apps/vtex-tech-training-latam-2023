import { InstanceOptions } from '../../HttpClient/typings';
import { IOContext } from '../../service/worker/runtime/typings';
import { IOClient } from '../IOClient';
/**
 * Used to perform calls on infra apps (e.g. sphinx, apps, vbase).
 */
export declare class InfraClient extends IOClient {
    constructor(app: string, context: IOContext, options?: InstanceOptions, isRoot?: boolean);
}

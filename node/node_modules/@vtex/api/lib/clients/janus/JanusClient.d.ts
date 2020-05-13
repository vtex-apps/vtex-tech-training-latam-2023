import { InstanceOptions } from '../../HttpClient/typings';
import { IOContext } from '../../service/worker/runtime/typings';
import { ExternalClient } from '../external/ExternalClient';
declare type Environment = 'stable' | 'beta';
/**
 * Used to perform calls on APIs in the VTEX Janus infrastructure, to which you must declare an outbound policy.
 *
 * Example policy:
 *
 * {
 *   "name": "outbound-access",
 *   "attrs": {
 *     "host": "portal.vtexcommercestable.com.br",
 *     "path": "/api/*"
 *   }
 * }
 */
export declare class JanusClient extends ExternalClient {
    constructor(context: IOContext, options?: InstanceOptions, environment?: Environment);
}
export {};

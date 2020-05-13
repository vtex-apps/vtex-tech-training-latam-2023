import { IOClients } from '../../../clients/IOClients';
import { ParamsContext, RecorderState, ServiceConfig } from './typings';
/**
 * This is the client definition to allow type checking on code editors.
 * In you `index.ts`, you must `export default new Service({...})` with your
 * client options, implementation and route handlers.
 *
 * @export
 * @class Service
 * @template ClientsT Your Clients implementation that extends IOClients and adds extra clients.
 * @template StateT The state bag in `ctx.state`
 * @template CustomT Any custom fields in `ctx`. THIS IS NOT RECOMMENDED. Use StateT instead.
 */
export declare class Service<T extends IOClients, U extends RecorderState, V extends ParamsContext> {
    config: ServiceConfig<T, U, V>;
    constructor(config: ServiceConfig<T, U, V>);
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../../logger");
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
class Service {
    constructor(config) {
        this.config = config;
        if (config.routes && config.routes.graphql) {
            logger_1.logOnceToDevConsole(`Route id "graphql" is reserved and apps containing this routes will stop working in the near future. To create a GraphQL app, export a "graphql" key with {resolvers}.`, logger_1.LogLevel.Warn);
        }
    }
}
exports.Service = Service;

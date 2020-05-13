"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typings_1 = require("../../HttpClient/typings");
const routes_1 = require("../../service/worker/runtime/http/routes");
const IOGraphQLClient_1 = require("../IOGraphQLClient");
const useHttps = !process.env.VTEX_IO;
/**
 * Used to perform calls on apps you declared a dependency for in your manifest.
 */
class AppGraphQLClient extends IOGraphQLClient_1.IOGraphQLClient {
    constructor(app, context, options) {
        const { account, workspace, region } = context;
        const [appName, appVersion] = app.split('@');
        const [vendor, name] = appName.split('.'); // vtex.messages
        const protocol = useHttps ? 'https' : 'http';
        let baseURL;
        if (appVersion) {
            const [major] = appVersion.split('.');
            baseURL = routes_1.formatPrivateRoute({ account, workspace, major, name, vendor, protocol, path: '/_v/graphql' });
        }
        else {
            console.warn(`${account} in ${workspace} is using old routing for ${app}. Please change vendor.app to vendor.app@major in client ${(options && options.name) || ''}`);
            const service = [name, vendor].join('.'); // messages.vtex
            baseURL = `http://${service}.${region}.vtex.io/${account}/${workspace}/_v/graphql`;
        }
        super(context, {
            ...options,
            authType: typings_1.AuthType.bearer,
            baseURL,
            name,
        });
    }
}
exports.AppGraphQLClient = AppGraphQLClient;

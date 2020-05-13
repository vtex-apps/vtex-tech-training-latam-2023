"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const typings_1 = require("../../HttpClient/typings");
const IOClient_1 = require("../IOClient");
const useHttps = !constants_1.IS_IO;
/**
 * Used to perform calls on infra apps (e.g. sphinx, apps, vbase).
 */
class InfraClient extends IOClient_1.IOClient {
    constructor(app, context, options, isRoot = false) {
        const { account, workspace, region } = context;
        const [appName, appVersion] = app.split('@');
        const protocol = useHttps ? 'https' : 'http';
        let baseURL;
        if (appVersion) {
            const [appMajor] = appVersion.split('.');
            baseURL = `${protocol}://infra.io.vtex.com/${appName}/v${appMajor}${isRoot ? '' : `/${account}/${workspace}`}`;
        }
        else if (app === 'router') {
            baseURL = `${protocol}://platform.io.vtex.com/${isRoot ? '' : `/${account}/${workspace}`}`;
        }
        else {
            console.warn(`${account} in ${workspace} is using old routing for ${app}. This will stop working soon`);
            baseURL = `http://${app}.${region}.vtex.io${isRoot ? '' : `/${account}/${workspace}`}`;
        }
        super(context, {
            ...options,
            authType: typings_1.AuthType.bearer,
            baseURL,
        });
    }
}
exports.InfraClient = InfraClient;

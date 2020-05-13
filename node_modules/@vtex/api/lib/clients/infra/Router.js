"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InfraClient_1 = require("./InfraClient");
const routes = {
    AvailableIoVersions: '/_io',
    AvailableServiceVersions: (service) => `${routes.AvailableServices}/${service}`,
    AvailableServices: '/_services',
    InstalledIoVersion: (account, workspace) => `/${account}/${workspace}/io`,
    InstalledService: (account, workspace, name) => `/${routes.InstalledServices(account, workspace)}/services/${name}`,
    InstalledServices: (account, workspace) => `/${account}/${workspace}/services`,
};
class Router extends InfraClient_1.InfraClient {
    constructor(ioContext, opts) {
        super('router', ioContext, opts, true);
        this.listAvailableIoVersions = (tracingConfig) => {
            return this.http.get(routes.AvailableIoVersions, { tracing: {
                    requestSpanNameSuffix: 'list-io-versions',
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                } });
        };
        this.getInstalledIoVersion = (tracingConfig) => {
            if (!this.context.account || !this.context.workspace) {
                throw new Error('Missing client parameters: {account, workspace}');
            }
            return this.http.get(routes.InstalledIoVersion(this.context.account, this.context.workspace), {
                tracing: {
                    requestSpanNameSuffix: 'get-installed-io-version',
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                },
            });
        };
        this.installIo = (version, tracingConfig) => {
            if (!this.context.account || !this.context.workspace) {
                throw new Error('Missing client parameters: {account, workspace}');
            }
            return this.http.put(routes.InstalledIoVersion(this.context.account, this.context.workspace), { version }, { tracing: {
                    requestSpanNameSuffix: 'install-io',
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                } });
        };
        this.listAvailableServices = (tracingConfig) => {
            return this.http.get(routes.AvailableServices, {
                tracing: {
                    requestSpanNameSuffix: 'list-available-services',
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                },
            });
        };
        this.getAvailableVersions = (name, tracingConfig) => {
            return this.http.get(routes.AvailableServiceVersions(name), {
                tracing: {
                    requestSpanNameSuffix: 'get-versions',
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                },
            });
        };
        this.listInstalledServices = (tracingConfig) => {
            if (!this.context.account || !this.context.workspace) {
                throw new Error('Missing client parameters: {account, workspace}');
            }
            return this.http.get(routes.InstalledServices(this.context.account, this.context.workspace), {
                tracing: {
                    requestSpanNameSuffix: 'list-installed-services',
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                },
            });
        };
        this.installService = (name, version, tracingConfig) => {
            if (!this.context.account || !this.context.workspace) {
                throw new Error('Missing client parameters: {account, workspace}');
            }
            return this.http.post(routes.InstalledServices(this.context.account, this.context.workspace), { name, version }, {
                tracing: {
                    requestSpanNameSuffix: 'install-service',
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                },
            });
        };
    }
}
exports.Router = Router;

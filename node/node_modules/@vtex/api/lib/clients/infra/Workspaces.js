"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const InfraClient_1 = require("./InfraClient");
const routes = {
    Account: (account) => `/${account}`,
    Promote: (account) => `${routes.Workspace(account, constants_1.DEFAULT_WORKSPACE)}/_promote`,
    Workspace: (account, workspace) => `${routes.Account(account)}/${workspace}`,
};
class Workspaces extends InfraClient_1.InfraClient {
    constructor(context, options) {
        super('router', context, options, true);
        this.list = (account, tracingConfig) => {
            const metric = 'workspaces-list';
            return this.http.get(routes.Account(account), { metric, tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                } });
        };
        this.get = (account, workspace, tracingConfig) => {
            const metric = 'workspaces-get';
            return this.http.get(routes.Workspace(account, workspace), { metric, tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                } });
        };
        this.set = (account, workspace, metadata, tracingConfig) => {
            const metric = 'workspaces-set';
            return this.http.put(routes.Workspace(account, workspace), metadata, { metric, tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                } });
        };
        this.create = (account, workspace, production, tracingConfig) => {
            const metric = 'workspaces-create';
            return this.http.post(routes.Account(account), { name: workspace, production }, { metric, tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                } });
        };
        this.delete = (account, workspace, tracingConfig) => {
            const metric = 'workspaces-delete';
            return this.http.delete(routes.Workspace(account, workspace), { metric, tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                } });
        };
        this.reset = (account, workspace, metadata = {}, tracingConfig) => {
            const params = { reset: true };
            const metric = 'workspaces-reset';
            return this.http.put(routes.Workspace(account, workspace), metadata, { metric, params, tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                } });
        };
        this.promote = (account, workspace, tracingConfig) => {
            const metric = 'workspaces-promote';
            return this.http.put(routes.Promote(account), { workspace }, { metric, tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                } });
        };
    }
}
exports.Workspaces = Workspaces;

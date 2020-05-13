"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const ramda_1 = require("ramda");
const constants_1 = require("../../../../../constants");
const app_1 = require("./../../../../../utils/app");
const joinIds = ramda_1.join('');
const dependsOnApp = (appAtMajor) => (a) => {
    const [name, major] = appAtMajor.split('@');
    const majorInt = major.includes('.') ? major.split('.')[0] : major;
    const version = a._resolvedDependencies[name];
    if (!version) {
        return false;
    }
    const [depMajor] = version.split('.');
    return majorInt === depMajor;
};
exports.getFilteredDependencies = (appAtMajor, dependencies) => {
    const depends = dependsOnApp(appAtMajor);
    return dependencies.filter(depends);
};
exports.getDependenciesHash = (dependencies) => {
    const dependingApps = ramda_1.pluck('id', dependencies);
    return crypto_1.createHash('md5')
        .update(joinIds(dependingApps))
        .digest('hex');
};
exports.getDependenciesSettings = async (apps, assets, tracingConfig) => {
    const appId = constants_1.APP.ID;
    const metaInfos = await apps.getAppsMetaInfos(undefined, undefined, tracingConfig);
    const appAtMajor = app_1.appIdToAppAtMajor(appId);
    return await assets.getSettings(metaInfos, appAtMajor, undefined, tracingConfig);
};
exports.getServiceSettings = () => {
    return async function settingsContext(ctx, next) {
        const { clients: { apps, assets }, } = ctx;
        const rootSpan = ctx.tracing.currentSpan;
        const dependenciesSettings = await exports.getDependenciesSettings(apps, assets, { tracing: { rootSpan } });
        // TODO: for now returning all settings, but the ideia is to do merge
        ctx.vtex.settings = dependenciesSettings;
        await next();
    };
};

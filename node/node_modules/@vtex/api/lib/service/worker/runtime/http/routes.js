"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../../constants");
exports.formatPrivateRoute = ({ protocol = 'https', vendor, name, major, account, workspace, path }) => `${protocol}://app.io.vtex.com/${vendor}.${name}/v${major}/${account}/${workspace}${path || ''}`;
exports.formatPublicRoute = ({ workspace, account, endpoint, path }) => `https://${workspace}--${account}.${endpoint}${path}`;
const getPath = ({ public: publicRoute, path }) => publicRoute
    ? exports.formatPublicRoute({ workspace: constants_1.WORKSPACE, account: constants_1.ACCOUNT, endpoint: constants_1.PUBLIC_ENDPOINT, path })
    : exports.formatPrivateRoute({ protocol: 'https', vendor: constants_1.APP.VENDOR, name: constants_1.APP.NAME, major: constants_1.APP.MAJOR, account: constants_1.ACCOUNT, workspace: constants_1.WORKSPACE, path });
exports.logAvailableRoutes = (service) => {
    const available = Object.values(service.routes || {}).reduce((acc, route) => `${acc}\n${getPath(route)}`, 'Available service routes:');
    console.info(available);
};

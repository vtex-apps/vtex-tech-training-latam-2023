"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const semver_1 = __importDefault(require("semver"));
// Note: The name that composes the part of the appId that precedes the
// character '@' includes the name given to the app and the vendor name.
exports.removeBuild = (id) => id.split('+')[0];
exports.removeVersionFromAppId = (appId) => appId.split('@')[0];
exports.extractVersionFromAppId = (appId) => appId.split('@').slice(-1)[0];
exports.transformToLinkedLocator = (appId) => appId.replace(/\+build.*$/, '+linked');
exports.formatLocator = (name, versionAndBuild) => `${name}@${exports.removeBuild(versionAndBuild)}`;
exports.isLinkedApp = (app) => app.id.includes('+build');
exports.parseAppId = (appId) => {
    const name = exports.removeVersionFromAppId(appId);
    const version = exports.extractVersionFromAppId(appId);
    const splittedVersion = version.split('+');
    return {
        build: splittedVersion[1],
        locator: exports.formatLocator(name, version),
        name,
        version: splittedVersion[0],
    };
};
exports.formatAppId = ({ locator, build }) => build ? `${locator}+${build}` : locator;
exports.satisfies = (appId, version) => {
    const { version: appVer } = exports.parseAppId(appId);
    return semver_1.default.satisfies(appVer, version);
};
exports.versionToMajor = (version) => version.split('.')[0];
exports.versionToMajorRange = (version) => `${exports.versionToMajor(version)}.x`;
exports.formatMajorLocator = (name, version) => {
    const majorRange = exports.versionToMajorRange(version);
    return `${name}@${majorRange}`;
};
exports.appIdToAppAtMajor = (appId) => {
    const { name, version } = exports.parseAppId(appId);
    const majorRange = exports.versionToMajorRange(version);
    return `${name}@${majorRange}`;
};
// SemVer regex from https://github.com/sindresorhus/semver-regex
const APP_ID_REGEX = /^[\w\-]+\.[\w\-]+@(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)(?:-[\da-z\-]+(?:\.[\da-z\-]+)*)?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?$/;
exports.isValidAppIdOrLocator = (appId) => {
    return APP_ID_REGEX.test(appId);
};

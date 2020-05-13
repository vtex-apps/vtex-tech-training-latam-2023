"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
exports.generatePathName = (rpath) => {
    const pathFieldNames = ramda_1.filter(value => typeof value === 'string', rpath);
    return pathFieldNames.join('.');
};

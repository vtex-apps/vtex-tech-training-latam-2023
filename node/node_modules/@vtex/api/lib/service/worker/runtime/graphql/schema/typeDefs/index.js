"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_upload_1 = require("graphql-upload");
const ramda_1 = require("ramda");
const ioUpload_1 = require("./ioUpload");
const sanitizedString_1 = require("./sanitizedString");
exports.nativeResolvers = {
    'IOSanitizedString': sanitizedString_1.resolvers,
    'IOUpload': ioUpload_1.resolvers,
    'Upload': graphql_upload_1.GraphQLUpload,
};
exports.nativeTypeDefs = (metaData) => ramda_1.reduce((acc, scalar) => !metaData[scalar] ? `${acc}\nscalar ${scalar}\n` : acc, '', ramda_1.keys(exports.nativeResolvers));

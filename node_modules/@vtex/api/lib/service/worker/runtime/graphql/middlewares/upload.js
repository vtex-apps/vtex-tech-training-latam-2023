"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_upload_1 = require("graphql-upload");
const graphqlUpload = graphql_upload_1.graphqlUploadKoa({
    maxFieldSize: 1e6,
    maxFileSize: 4 * 1e6,
    maxFiles: 10,
});
function graphqlUploadKoaMiddleware(ctx, next) {
    return graphqlUpload(ctx, next);
}
exports.upload = graphqlUploadKoaMiddleware;

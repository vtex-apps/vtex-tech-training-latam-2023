"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
const __1 = require("..");
const brand_1 = require("./brand");
const category_1 = require("./category");
const product_1 = require("./product");
const sku_1 = require("./sku");
class CatalogGraphQL extends __1.AppGraphQLClient {
    constructor(ctx, opts) {
        super('vtex.catalog-graphql@1.x', ctx, {
            ...opts,
            headers: {
                ...opts && opts.headers,
                cookie: `VtexIdclientAutCookie=${ctx.authToken}`,
            }
        });
        this.sku = (id, tracingConfig) => {
            const variables = {
                identifier: {
                    field: 'id',
                    value: id,
                },
            };
            return this.graphql
                .query({
                inflight: true,
                query: sku_1.query,
                variables,
            }, {
                forceMaxAge: 5,
                tracing: {
                    requestSpanNameSuffix: 'catalog-sku',
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                },
            })
                .then(ramda_1.prop('data'));
        };
        this.product = (id, tracingConfig) => {
            const variables = {
                identifier: {
                    field: 'id',
                    value: id,
                },
            };
            return this.graphql
                .query({
                inflight: true,
                query: product_1.query,
                variables,
            }, {
                forceMaxAge: 5,
                tracing: {
                    requestSpanNameSuffix: 'catalog-product',
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                },
            })
                .then(ramda_1.prop('data'));
        };
        this.category = (id, tracingConfig) => this.graphql
            .query({
            inflight: true,
            query: category_1.query,
            variables: { id },
        }, {
            forceMaxAge: 5,
            tracing: {
                requestSpanNameSuffix: 'catalog-category',
                ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
            },
        })
            .then(ramda_1.prop('data'));
        this.brand = (id, tracingConfig) => this.graphql
            .query({
            inflight: true,
            query: brand_1.query,
            variables: { id },
        }, {
            forceMaxAge: 5,
            tracing: {
                requestSpanNameSuffix: 'catalog-brand',
                ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
            },
        })
            .then(ramda_1.prop('data'));
    }
}
exports.CatalogGraphQL = CatalogGraphQL;

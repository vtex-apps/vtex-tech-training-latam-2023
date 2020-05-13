"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
const AppGraphQLClient_1 = require("./AppGraphQLClient");
const MAX_BATCH_SIZE = 500;
class MessagesGraphQL extends AppGraphQLClient_1.AppGraphQLClient {
    constructor(vtex, options) {
        super('vtex.messages@1.x', vtex, options);
    }
    translateV2(args, tracingConfig) {
        const { indexedByFrom, ...rest } = args;
        const allMessages = indexedByFrom.reduce((acc, { from, messages }) => {
            return acc.concat(messages.map(message => ({ from, message })));
        }, []);
        const batchedMessages = ramda_1.splitEvery(MAX_BATCH_SIZE, allMessages);
        const metric = 'messages-translate-v2';
        return Promise.all(batchedMessages.map(batch => {
            const indexedBatch = batch.reduce((acc, { from, message }) => {
                if (!acc[from]) {
                    acc[from] = {
                        from,
                        messages: [],
                    };
                }
                acc[from].messages.push(message);
                return acc;
            }, {});
            const batchArgs = {
                ...rest,
                indexedByFrom: ramda_1.values(indexedBatch),
            };
            return this.graphql.query({
                query: `
      query Translate($args: TranslateArgs!) {
        translate(args: $args)
      }
      `,
                variables: { args: batchArgs },
            }, {
                metric,
                tracing: {
                    requestSpanNameSuffix: metric,
                    ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
                },
            }).then(ramda_1.path(['data', 'translate']));
        })).then(ramda_1.flatten);
    }
    async translate(args, tracingConfig) {
        const metric = 'messages-translate-v2';
        const response = await this.graphql.query({
            query: `query Translate($args: TranslateArgs!) {
          translate(args: $args)
        }`,
            variables: { args },
        }, {
            metric,
            tracing: {
                requestSpanNameSuffix: metric,
                ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
            },
        });
        return response.data.translate;
    }
    async translateWithDependencies(args, tracingConfig) {
        const metric = 'messages-translate-with-deps-v2';
        const response = await this.graphql.query({
            query: `query TranslateWithDeps($args: TranslateWithDependenciesArgs!) {
          translateWithDependencies(args: $args)
        }`,
            variables: { args },
        }, {
            metric,
            tracing: {
                requestSpanNameSuffix: metric,
                ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
            },
        });
        return response.data.translateWithDependencies;
    }
    async saveV2(args, tracingConfig) {
        const metric = 'messages-saveV2-translation';
        const response = await this.graphql.mutate({
            mutate: `mutation SaveV2($args: SaveArgsV2!) {
          saveV2(args: $args)
        }`,
            variables: { args },
        }, {
            metric,
            tracing: {
                requestSpanNameSuffix: metric,
                ...tracingConfig === null || tracingConfig === void 0 ? void 0 : tracingConfig.tracing,
            },
        });
        return response.data.saveV2;
    }
}
exports.MessagesGraphQL = MessagesGraphQL;

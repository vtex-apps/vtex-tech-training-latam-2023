"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataloader_1 = __importDefault(require("dataloader"));
const ramda_1 = require("ramda");
const sortByContentAndFrom = (indexedMessages) => ramda_1.sortBy(([_, { content, from }]) => `__from:${from}__content:${content}`, indexedMessages);
// O(n) counting sort implementation
const sortByIndex = (indexedTranslations) => indexedTranslations.reduce((acc, [index, data]) => {
    acc[index] = data;
    return acc;
}, []);
const indexMessagesByFrom = (messages) => messages.reduce((acc, { from, context, content, behavior }) => {
    const lastIndexed = acc.length && acc[acc.length - 1];
    const formatted = {
        behavior,
        content,
        context,
    };
    if (lastIndexed && lastIndexed.from === from) {
        lastIndexed.messages.push(formatted);
    }
    else {
        acc.push({
            from,
            messages: [formatted],
        });
    }
    return acc;
}, []);
const toPairs = (x) => x.map((xx, it) => [it, xx]);
const splitIndex = (indexed) => indexed.reduce((acc, [index, data]) => {
    acc[0].push(index);
    acc[1].push(data);
    return acc;
}, [[], []]);
const filterFromEqualsTo = (indexedMessages, to) => indexedMessages.reduce((acc, indexed) => {
    const [index, { content, from }] = indexed;
    if (to === from.toLowerCase() || !content) {
        acc.original.push([index, content]);
    }
    else {
        acc.toTranslate.push(indexed);
    }
    return acc;
}, {
    original: [],
    toTranslate: [],
});
const messageToKey = ({ content, context, from }) => `:content:${content}:context:${context}:from:${from}`;
exports.createMessagesLoader = ({ messagesGraphQL, assets }, to, dependencies) => {
    const loweredTo = to.toLowerCase();
    const messagesDeps = dependencies && assets.getFilteredDependencies('vtex.messages@1.x', dependencies);
    const depTree = messagesDeps && JSON.stringify(messagesDeps);
    return new dataloader_1.default(async (messages) => {
        const indexedMessages = toPairs(messages);
        const { toTranslate, original } = filterFromEqualsTo(indexedMessages, loweredTo);
        // In case we have nothing to translate
        if (toTranslate.length === 0) {
            return messages.map(({ content }) => content);
        }
        const sortedIndexedMessages = sortByContentAndFrom(toTranslate);
        const [originalIndexes, sortedMessages] = splitIndex(sortedIndexedMessages);
        const indexedByFrom = indexMessagesByFrom(sortedMessages);
        const args = { indexedByFrom, to };
        const translations = depTree
            ? await messagesGraphQL.translateWithDependencies({ ...args, depTree })
            : await messagesGraphQL.translate(args);
        const indexedTranslations = ramda_1.zip(originalIndexes, translations);
        const allIndexedTranslations = [...indexedTranslations, ...original];
        return sortByIndex(allIndexedTranslations);
    }, {
        batch: true,
        cache: true,
        cacheKeyFn: messageToKey,
        maxBatchSize: 200,
    });
};

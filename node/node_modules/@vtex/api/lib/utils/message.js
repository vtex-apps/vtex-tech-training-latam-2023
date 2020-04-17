"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PROVIDER_SPACER = '::';
exports.providerFromMessage = (message) => {
    const { provider } = exports.parseIOMessageId(message);
    return provider || 'unknown';
};
exports.parseIOMessageId = ({ id }) => {
    const splitted = id.split(exports.PROVIDER_SPACER);
    if (splitted.length === 2) {
        return {
            locator: splitted[1],
            provider: splitted[0],
        };
    }
    return {
        locator: splitted[0],
    };
};
exports.removeProviderFromId = (message) => ({
    ...message,
    id: exports.parseIOMessageId(message).locator,
});

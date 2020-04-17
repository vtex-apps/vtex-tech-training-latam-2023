"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusLabel = (status) => {
    if (status >= 500) {
        return 'error';
    }
    if (status >= 200 && status < 300) {
        return 'success';
    }
    return `${Math.floor(status / 100)}xx`;
};

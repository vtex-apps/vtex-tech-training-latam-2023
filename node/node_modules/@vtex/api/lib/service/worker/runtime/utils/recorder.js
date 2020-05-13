"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
const constants_1 = require("./../../../../constants");
const HEADERS = [constants_1.META_HEADER, constants_1.META_HEADER_BUCKET];
class Recorder {
    constructor() {
        this._record = HEADERS.reduce((acc, headerName) => {
            acc[headerName] = new Set();
            return acc;
        }, {});
    }
    clear() {
        HEADERS.forEach(headerName => this._record[headerName].clear());
    }
    record(headers) {
        HEADERS.forEach(headerName => {
            const h = headers === null || headers === void 0 ? void 0 : headers[headerName];
            if (h) {
                h.split(',').map(ramda_1.trim).forEach(hh => this._record[headerName].add(hh));
            }
        });
    }
    flush(ctx) {
        HEADERS.forEach(headerName => {
            const newValueSet = new Set(this._record[headerName]);
            const currentValue = ctx.response.get(headerName);
            const parsedCurrentValue = typeof currentValue === 'string' ? currentValue.split(',') : currentValue;
            parsedCurrentValue.forEach(cur => newValueSet.add(ramda_1.trim(cur)));
            const deduped = Array.from(newValueSet).filter(x => !!x);
            if (deduped.length > 0) {
                ctx.set(headerName, deduped);
            }
        });
    }
}
exports.Recorder = Recorder;

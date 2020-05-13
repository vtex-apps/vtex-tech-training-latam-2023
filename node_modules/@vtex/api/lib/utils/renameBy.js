"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
exports.renameBy = (fn, obj) => ramda_1.compose(ramda_1.fromPairs, ramda_1.map(([key, val]) => [fn(key), val]), ramda_1.toPairs)(obj);

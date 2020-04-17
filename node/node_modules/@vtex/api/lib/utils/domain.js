"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
const VTEX_PUBLIC_ENDPOINT = process.env.VTEX_PUBLIC_ENDPOINT || 'myvtex.com';
exports.PUBLIC_DOMAINS = ramda_1.uniq([VTEX_PUBLIC_ENDPOINT, 'myvtex.com', 'mygocommerce.com', 'vtexsmb.com']);

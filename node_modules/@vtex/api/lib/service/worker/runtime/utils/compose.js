"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_compose_1 = __importDefault(require("koa-compose"));
const ramda_1 = require("ramda");
const cancel_1 = require("../../../../utils/cancel");
const time_1 = require("../../../../utils/time");
exports.compose = (middlewares) => koa_compose_1.default(middlewares.map(ramda_1.pipe(time_1.timer, cancel_1.cancel)));
exports.composeForEvents = (middlewares) => koa_compose_1.default(middlewares.map(time_1.timerForEvents));

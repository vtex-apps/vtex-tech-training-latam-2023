"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const opentracing_1 = require("opentracing");
const SpanReferenceTypes_1 = require("./SpanReferenceTypes");
function createSpanReference(span, type) {
    return new opentracing_1.Reference(type === SpanReferenceTypes_1.SpanReferenceTypes.CHILD_OF ? opentracing_1.REFERENCE_CHILD_OF : opentracing_1.REFERENCE_FOLLOWS_FROM, span.context());
}
exports.createSpanReference = createSpanReference;

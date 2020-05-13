import { Reference, Span } from 'opentracing';
import { SpanReferenceTypes } from './SpanReferenceTypes';
export declare function createSpanReference(span: Span, type: SpanReferenceTypes): Reference;

import { InstanceOptions, RequestTracingConfig } from '../../HttpClient';
import { IOContext } from '../../service/worker/runtime/typings';
import { AppGraphQLClient } from './AppGraphQLClient';
export interface IndexedByFrom {
    messages: Array<Omit<Message, 'from'>>;
    from: string;
}
export declare type Behavior = 'FULL' | 'USER_ONLY' | 'USER_AND_APP';
export interface Message {
    content: string;
    context?: string;
    behavior?: Behavior;
    from: string;
}
export interface MessageSaveInput {
    srcLang: string;
    srcMessage: string;
    context?: string;
    targetMessage: string;
    groupContext?: string;
}
export interface TranslateInput {
    indexedByFrom: IndexedByFrom[];
    to: string;
    depTree?: string;
    encoding?: 'ICU' | 'HANDLEBARS';
}
export interface TranslateWithDependenciesInput {
    indexedByFrom: IndexedByFrom[];
    to: string;
    depTree: string;
    encoding?: 'ICU' | 'HANDLEBARS';
}
export interface SaveInput {
    fireEvent?: boolean;
    to: string;
    messages: MessageSaveInput[];
}
export declare class MessagesGraphQL extends AppGraphQLClient {
    constructor(vtex: IOContext, options?: InstanceOptions);
    translateV2(args: TranslateInput, tracingConfig?: RequestTracingConfig): Promise<string[]>;
    translate(args: TranslateInput, tracingConfig?: RequestTracingConfig): Promise<string[]>;
    translateWithDependencies(args: TranslateWithDependenciesInput, tracingConfig?: RequestTracingConfig): Promise<string[]>;
    saveV2(args: SaveInput, tracingConfig?: RequestTracingConfig): Promise<boolean>;
}

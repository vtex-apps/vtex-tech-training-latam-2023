import { GraphQLError } from 'graphql';
import { HttpClient } from './HttpClient';
import { RequestConfig } from './typings';
interface QueryOptions<Variables extends object> {
    query: string;
    variables: Variables;
    inflight?: boolean;
    throwOnError?: boolean;
    extensions?: Record<string, any>;
}
interface MutateOptions<Variables extends object> {
    mutate: string;
    variables: Variables;
    throwOnError?: boolean;
}
export declare type Serializable = object | boolean | string | number;
export interface GraphQLResponse<T extends Serializable> {
    data?: T;
    errors?: GraphQLError[];
    extensions?: Record<string, any>;
}
export declare class GraphQLClient {
    private http;
    constructor(http: HttpClient);
    query: <Data extends Serializable, Variables extends object>({ query, variables, inflight, extensions, throwOnError }: QueryOptions<Variables>, config?: RequestConfig) => Promise<GraphQLResponse<Data>>;
    mutate: <Data extends Serializable, Variables extends object>({ mutate, variables, throwOnError }: MutateOptions<Variables>, config?: RequestConfig) => Promise<GraphQLResponse<Data>>;
}
export {};

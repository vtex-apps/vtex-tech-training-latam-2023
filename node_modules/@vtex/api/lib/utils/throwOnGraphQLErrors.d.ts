import { GraphQLResponse } from '../HttpClient/GraphQLClient';
export declare function throwOnGraphQLErrors(message: string): (response: GraphQLResponse<any>) => GraphQLResponse<any>;

import { GraphQLServiceContext } from '../typings';
declare function graphqlUploadKoaMiddleware(ctx: GraphQLServiceContext, next: () => Promise<void>): Promise<void>;
export declare const upload: typeof graphqlUploadKoaMiddleware;
export {};

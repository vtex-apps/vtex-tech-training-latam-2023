import { GraphQLServiceContext } from '../typings';
export declare function graphqlError(ctx: GraphQLServiceContext, next: () => Promise<void>): Promise<void>;

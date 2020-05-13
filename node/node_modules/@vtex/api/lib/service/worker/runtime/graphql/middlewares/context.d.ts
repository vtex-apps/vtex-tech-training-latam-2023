import { GraphQLServiceContext } from '../typings';
export declare function injectGraphqlContext(ctx: GraphQLServiceContext, next: () => Promise<void>): Promise<void>;

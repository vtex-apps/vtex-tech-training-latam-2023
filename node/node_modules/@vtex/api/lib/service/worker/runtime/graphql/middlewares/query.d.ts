import { GraphQLSchema } from 'graphql';
export declare const extractQuery: (schema: GraphQLSchema) => (ctx: import("../../typings").ServiceContext<import("../../../../..").IOClients, import("../../typings").RecorderState, import("../typings").GraphQLContext>, next: () => Promise<void>) => Promise<void>;

import { GraphQLObjectType, GraphQLSchema } from 'graphql';
export default function resolveFromParentTypename(parent: any, schema: GraphQLSchema): GraphQLObjectType<any, any, {
    [key: string]: any;
}>;

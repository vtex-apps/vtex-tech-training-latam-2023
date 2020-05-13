import { IOClients } from '../../../../clients/IOClients';
import { ClientsConfig, GraphQLOptions, ParamsContext, RecorderState, ServiceRoute } from '../typings';
import { GraphQLContext } from './typings';
export declare const GRAPHQL_ROUTE = "__graphql";
export declare const createGraphQLRoute: <T extends IOClients, U extends RecorderState, V extends ParamsContext>(graphql: GraphQLOptions<T, U, V>, clientsConfig: ClientsConfig<T>, serviceRoute: ServiceRoute, routeId: string) => import("koa-compose").ComposedMiddleware<import("../typings").ServiceContext<T, U, V & GraphQLContext>>;

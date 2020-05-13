import { IOClients } from '../../../../../clients/IOClients';
import { GraphQLOptions, ParamsContext, RecorderState } from '../../typings';
export declare type SchemaMetaData = Record<string, boolean>;
export declare const makeSchema: <ClientsT extends IOClients = IOClients, StateT extends RecorderState = RecorderState, CustomT extends ParamsContext = ParamsContext>(options: GraphQLOptions<ClientsT, StateT, CustomT>) => import("graphql").GraphQLSchema;

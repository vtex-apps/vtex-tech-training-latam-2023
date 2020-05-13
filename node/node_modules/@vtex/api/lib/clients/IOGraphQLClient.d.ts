import { GraphQLClient } from '../HttpClient/GraphQLClient';
import { InstanceOptions } from '../HttpClient/typings';
import { IOContext } from '../service/worker/runtime/typings';
import { IOClient } from './IOClient';
/**
 * A GraphQL client that can be instantiated by the Serviceruntime layer.
 */
export declare class IOGraphQLClient extends IOClient {
    protected context: IOContext;
    protected options?: InstanceOptions | undefined;
    protected graphql: GraphQLClient;
    constructor(context: IOContext, options?: InstanceOptions | undefined);
}

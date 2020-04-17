import { ClientsImplementation, IOClients } from '../../../../../clients/IOClients';
import { InstanceOptions } from '../../../../../HttpClient';
import { ParamsContext, RecorderState, ServiceContext } from '../../typings';
export declare function clients<T extends IOClients, U extends RecorderState, V extends ParamsContext>(ClientsImpl: ClientsImplementation<T>, clientOptions: Record<string, InstanceOptions>): (ctx: ServiceContext<T, U, V>, next: () => Promise<void>) => Promise<void>;

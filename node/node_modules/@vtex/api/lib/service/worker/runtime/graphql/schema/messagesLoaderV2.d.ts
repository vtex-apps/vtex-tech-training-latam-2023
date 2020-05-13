import DataLoader from 'dataloader';
import { Message } from '../../../../../clients/apps/MessagesGraphQL';
import { AppMetaInfo } from '../../../../../clients/infra/Apps';
import { IOClients } from './../../../../../clients/IOClients';
export declare const createMessagesLoader: ({ messagesGraphQL, assets }: IOClients, to: string, dependencies?: AppMetaInfo[] | undefined) => DataLoader<Message, string>;
export declare type MessagesLoaderV2 = ReturnType<typeof createMessagesLoader>;

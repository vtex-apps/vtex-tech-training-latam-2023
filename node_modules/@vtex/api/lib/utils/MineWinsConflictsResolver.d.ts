import { ConflictsResolver, VBase } from '../clients/infra/VBase';
declare type Configuration = Record<string, ConfigurationData | ConfigurationData[] | object> | ConfigurationData[];
declare type ConfigurationData = Record<string, object>;
export declare class MineWinsConflictsResolver<T> implements ConflictsResolver<T> {
    /***
     * Take mine and merge with master keys that have no conflict
     * We use base to decide wether a key was deleted or not
     */
    private client;
    private bucket;
    private filePath;
    private comparableKeys;
    constructor(client: VBase, bucket: string, filePath: string, comparableKeys?: string[]);
    resolve(): Promise<T>;
    protected mergeMineWins(base: Configuration, master: Configuration, mine: Configuration): Configuration;
    private parseConflict;
    private serializeContentByMimetype;
    private parseContentByMimetype;
    private resolveConflictMineWins;
    private mergeMineWinsObject;
    private mergeMineWinsArray;
    private removeMasterDeletedElements;
    private isObjectInArray;
    private appendMasterAddedElements;
    private shouldAddToMine;
}
export {};

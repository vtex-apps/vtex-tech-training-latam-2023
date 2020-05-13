"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const js_base64_1 = require("js-base64");
const ramda_1 = require("ramda");
const util_1 = require("util");
class MineWinsConflictsResolver {
    constructor(client, bucket, filePath, comparableKeys) {
        this.client = client;
        this.bucket = bucket;
        this.filePath = filePath;
        this.comparableKeys = comparableKeys;
    }
    async resolve() {
        return await this.client.getConflicts(this.bucket).then(data => {
            const { data: conflicts } = data;
            const selectedConflict = conflicts.find(conflict => conflict.path === this.filePath);
            if (!selectedConflict) {
                return {};
            }
            selectedConflict.base.parsedContent = this.parseConflict(selectedConflict.base);
            selectedConflict.master.parsedContent = this.parseConflict(selectedConflict.master);
            selectedConflict.mine.parsedContent = this.parseConflict(selectedConflict.mine);
            const resolved = this.resolveConflictMineWins(selectedConflict);
            return resolved;
        });
    }
    mergeMineWins(base, master, mine) {
        if (util_1.isArray(master)) {
            return this.mergeMineWinsArray((base || []), master, (mine || []));
        }
        else if (util_1.isObject(master)) {
            return this.mergeMineWinsObject((base || {}), master, (mine || {}));
        }
        return mine ? mine : master;
    }
    parseConflict(conflict) {
        if (!conflict || !conflict.content) {
            return {};
        }
        return this.parseContentByMimetype(js_base64_1.Base64.decode(conflict.content), conflict.mimeType);
    }
    serializeContentByMimetype(content, mimetype) {
        if (mimetype === 'application/json') {
            return JSON.stringify(content);
        }
        return content;
    }
    parseContentByMimetype(content, mimetype) {
        if (mimetype === 'application/json') {
            return JSON.parse(content);
        }
        return content;
    }
    resolveConflictMineWins(conflict) {
        if (!conflict) {
            return {};
        }
        const { base, master, mine, path } = conflict;
        this.mergeMineWins(base.parsedContent, master.parsedContent, mine.parsedContent);
        const mergedContent = {
            content: js_base64_1.Base64.encode(this.serializeContentByMimetype(mine.parsedContent, conflict.mine.mimeType)),
            mimeType: conflict.mine.mimeType,
        };
        this.client.resolveConflict(this.bucket, path, mergedContent);
        return mine.parsedContent;
    }
    mergeMineWinsObject(base, master, mine) {
        const merged = { ...master, ...mine };
        Object.entries(merged).forEach(([key, value]) => {
            if (master[key] == null && base && base[key] != null && ramda_1.equals(value, base[key])) {
                delete merged[key]; // value deleted from master with no conflict
            }
            else if (base[key] && master[key] && !mine[key]) {
                delete merged[key]; // value deleted from mine
            }
            else if (util_1.isArray(value)) {
                merged[key] = this.mergeMineWinsArray((base[key] || []), (master[key] || []), value);
            }
            else if (util_1.isObject(value)) {
                merged[key] = this.mergeMineWins((base[key] || {}), (master[key] || {}), (value || {}));
            }
        });
        return merged;
    }
    mergeMineWinsArray(base, master, mine) {
        this.removeMasterDeletedElements(base, master, mine);
        this.appendMasterAddedElements(base, master, mine);
        return mine;
    }
    removeMasterDeletedElements(base, master, mine) {
        base.forEach(baseItem => {
            const foundInMaster = this.isObjectInArray(baseItem, master);
            if (!foundInMaster) {
                const foundInMine = mine.findIndex(mineItem => ramda_1.equals(mineItem, baseItem));
                if (foundInMine > -1) {
                    mine.splice(foundInMine, 1);
                }
            }
        });
    }
    isObjectInArray(obj, array) {
        return array.find(item => ramda_1.equals(item, obj));
    }
    appendMasterAddedElements(base, master, mine) {
        master.forEach(item => {
            if (this.shouldAddToMine(item, base, mine)) {
                mine.push(item);
            }
        });
    }
    shouldAddToMine(item, base, mine) {
        if (this.comparableKeys && Object.keys(item).some(key => this.comparableKeys.includes(key))) {
            return (!mine.some(mineItem => this.comparableKeys.some(key => ramda_1.eqProps(key, item, mineItem))) &&
                !base.some(baseItem => this.comparableKeys.some(key => ramda_1.eqProps(key, item, baseItem))));
        }
        return !mine.some(mineItem => ramda_1.equals(mineItem, item)) && !base.some(baseItem => ramda_1.equals(baseItem, item));
    }
}
exports.MineWinsConflictsResolver = MineWinsConflictsResolver;

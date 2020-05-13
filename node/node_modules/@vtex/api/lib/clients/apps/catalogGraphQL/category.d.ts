export declare const query = "\nquery GetCategory($id: ID!) {\n  category (id: $id) {\n    id\n    name\n    title\n    parentCategoryId\n    description\n    isActive\n    globalCategoryId\n    score\n  }\n}\n";
export interface Category {
    id: string;
    name: string;
    title?: string;
    parentCategoryId?: string;
    description?: string;
    isActive: boolean;
    globalCategoryId: number;
    score?: number;
}

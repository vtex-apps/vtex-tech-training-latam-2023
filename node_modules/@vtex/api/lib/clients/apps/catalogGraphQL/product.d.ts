export declare const query = "\nquery GetProduct ($identifier: ProductUniqueIdentifier!) {\n  product (identifier: $identifier) {\n    id\n    brandId\n    categoryId\n    departmentId\n    name\n    linkId\n    refId\n    isVisible\n    description\n    shortDescription\n    releaseDate\n    keywords\n    title\n    isActive\n    taxCode\n    metaTagDescription\n    supplierId\n    showWithoutStock\n    score\n    salesChannel {\n      id\n    }\n  }\n}\n";
export interface Product {
    id: string;
    brandId: string;
    categoryId: string;
    departmentId: string;
    name: string;
    linkId: string;
    refId?: string;
    isVisible: boolean;
    description?: string;
    shortDescription?: string;
    releaseDate?: string;
    keywords: string[];
    title?: string;
    isActive: boolean;
    taxCode?: string;
    metaTagDescription?: string;
    supplierId?: string;
    showWithoutStock: boolean;
    score?: number;
    salesChannel?: Array<{
        id: string;
    }>;
}

export declare const query = "\nquery GetSKU ($identifier: SKUUniqueIdentifier!) {\n  sku (identifier: $identifier) {\n    id\n    productId\n    isActive\n    name\n    height\n    length\n    width\n    weightKg\n    packagedHeight\n    packagedWidth\n    packagedLength\n    packagedWeightKg\n    cubicWeight\n    isKit\n    creationDate\n    rewardValue\n    manufacturerCode\n    commercialConditionId\n    measurementUnit\n    unitMultiplier\n    modalType\n    kitItensSellApart\n  }\n}\n";
export interface SKU {
    id: string;
    productId: string;
    isActive: boolean;
    name: string;
    height?: number;
    length?: number;
    width?: number;
    weightKg?: number;
    packagedHeight?: number;
    packagedWidth?: number;
    packagedLength?: number;
    packagedWeightKg?: number;
    cubicWeight: number;
    isKit: boolean;
    creationDate: string;
    rewardValue?: number;
    estimatedDateArrival?: string;
    manufacturerCode: string;
    commercialConditionId: string;
    measurementUnit: string;
    unitMultiplier: number;
    modalType?: string;
    kitItensSellApart: boolean;
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = `
query GetSKU ($identifier: SKUUniqueIdentifier!) {
  sku (identifier: $identifier) {
    id
    productId
    isActive
    name
    height
    length
    width
    weightKg
    packagedHeight
    packagedWidth
    packagedLength
    packagedWeightKg
    cubicWeight
    isKit
    creationDate
    rewardValue
    manufacturerCode
    commercialConditionId
    measurementUnit
    unitMultiplier
    modalType
    kitItensSellApart
  }
}
`;

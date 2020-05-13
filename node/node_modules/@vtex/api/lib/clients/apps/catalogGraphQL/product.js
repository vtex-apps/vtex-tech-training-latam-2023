"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = `
query GetProduct ($identifier: ProductUniqueIdentifier!) {
  product (identifier: $identifier) {
    id
    brandId
    categoryId
    departmentId
    name
    linkId
    refId
    isVisible
    description
    shortDescription
    releaseDate
    keywords
    title
    isActive
    taxCode
    metaTagDescription
    supplierId
    showWithoutStock
    score
    salesChannel {
      id
    }
  }
}
`;

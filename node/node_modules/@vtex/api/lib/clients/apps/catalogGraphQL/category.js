"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = `
query GetCategory($id: ID!) {
  category (id: $id) {
    id
    name
    title
    parentCategoryId
    description
    isActive
    globalCategoryId
    score
  }
}
`;

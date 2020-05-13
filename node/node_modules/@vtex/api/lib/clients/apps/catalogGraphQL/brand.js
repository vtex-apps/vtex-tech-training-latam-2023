"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = `
query GetBrand($id: ID!) {
  brand (id: $id) {
    id
    name
    text
    keywords
    siteTitle
    active
    menuHome
    adWordsRemarketingCode
    lomadeeCampaignCode
    score
  }
}
`;

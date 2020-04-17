export declare const query = "\nquery GetBrand($id: ID!) {\n  brand (id: $id) {\n    id\n    name\n    text\n    keywords\n    siteTitle\n    active\n    menuHome\n    adWordsRemarketingCode\n    lomadeeCampaignCode\n    score\n  }\n}\n";
export interface Brand {
    id: string;
    name: string;
    text?: string;
    keywords?: string[];
    siteTitle?: string;
    active: boolean;
    menuHome: boolean;
    adWordsRemarketingCode?: string;
    lomadeeCampaignCode?: string;
    score?: number;
}

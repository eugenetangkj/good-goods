export interface CommunityRecommendation {
    "_id": string;
    "enterpriseName": string;
    "description": string;
    "website": string;
    "numberOfLikes": number;
    "numberOfDislikes": number,
    "comments": string[],
    "emailAddress": string,
}
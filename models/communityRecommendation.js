// models/communityRecommendation.js
import mongoose from "mongoose";

const CommunityRecommendationSchema = new mongoose.Schema({
  enterpriseName: String,
  description: String,
  website: String,
  numberOfLikes: Number,
  numberOfDislikes: Number,
  comments: [String]
},
);

export default mongoose.models.CommunityRecommendation ||
  mongoose.model("CommunityRecommendation", CommunityRecommendationSchema);

// models/communityRecommendation.js
import mongoose from "mongoose";

const CommunityRecommendationSchema = new mongoose.Schema({
  enterpriseName: { type: String, required: true },
  description: { type: String, required: true },
  website: { type: String, required: true },
  numberOfLikes: { type: Number, default: 0 },
  numberOfDislikes: { type: Number, default: 0 },
  comments: { type: [String], default: [] },
  emailAddress: { type: String, required: true },
});

export default mongoose.models.CommunityRecommendation || mongoose.model("CommunityRecommendation", CommunityRecommendationSchema);

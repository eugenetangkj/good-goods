// models/recommendation.js
import mongoose from "mongoose";

const RecommendationSchema = new mongoose.Schema({
  eid: Number,
  enterpriseName: String,
  description: String,
  website: String,
},
);

export default mongoose.models.Recommendation ||
  mongoose.model("SocialEnterprise", RecommendationSchema);

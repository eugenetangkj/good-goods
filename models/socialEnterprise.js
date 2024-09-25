// models/socialEnterprise.js
import mongoose from "mongoose";

const SocialEnterpriseSchema = new mongoose.Schema({
  eid: Number,
  enterpriseName: String,
  urlParam: String,
  enterprisePictureRelativePath: String,
  typeOfImpact: [String],
  detailedImpact: String,
  format: [String],
  location: [String],
  region: [String],
  products: [String],
  businessType: String,
  openingHours: [String],
  website: String,
  logoImage: String,
},
);

export default mongoose.models.SocialEnterprise ||
  mongoose.model("SocialEnterprise", SocialEnterpriseSchema);

// src/models/socialEnterpriseEmbeddings.ts
import mongoose from 'mongoose';

const SocialEnterpriseEmbeddingSchema = new mongoose.Schema({
  enterpriseId: { type: mongoose.Schema.Types.ObjectId, ref: 'SocialEnterprise', required: true },
  embedding: { type: [Number], required: true },
}, { timestamps: true });

export default mongoose.models.SocialEnterpriseEmbedding ||
  mongoose.model('SocialEnterpriseEmbedding', SocialEnterpriseEmbeddingSchema);

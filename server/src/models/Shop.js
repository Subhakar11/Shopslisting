import mongoose from 'mongoose';

const shopSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  imageUrl: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('Shop', shopSchema);

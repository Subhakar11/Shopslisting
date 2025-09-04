import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  shop: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  description: { type: String, default: '' },
  imageUrl: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);

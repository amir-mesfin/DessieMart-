import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    brand: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    discountPercentage: {
      type: Number,
      default: 0 // default means no discount
    },
    stock: {
      type: Number,
      default: 0
    },
    thumbnail: {
      type: String // single main image URL
    },
    images: [String] // array of other image URLs
  },
  {
    timestamps: true // adds createdAt & updatedAt
  }
);

export default mongoose.model('Product', productSchema);

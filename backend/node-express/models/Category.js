// backend/node-express/models/Category.js
import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  }
}, { 
  timestamps: true 
});

// Create and export the model
const Category = mongoose.model('Category', categorySchema);
export default Category;
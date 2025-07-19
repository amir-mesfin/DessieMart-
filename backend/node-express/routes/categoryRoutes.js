import express from 'express';
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
  // existProduct1
} from '../controllers/categoryController.js';

const router = express.Router();

// Category routes
router.post('/categories', createCategory);
router.get('/categories', getCategories);
router.get('/categories/:id', getCategoryById);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);
// router.post('/categoriesExistProduct',existProduct1);

export default router;
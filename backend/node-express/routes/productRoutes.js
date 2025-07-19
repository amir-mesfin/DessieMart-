import express from 'express';
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';
import { productUpload, handleUploadErrors } from '../middleware/upload.js';

const router = express.Router();

router.get('/', getProducts);
router.post(
  '/products',
  productUpload,
  handleUploadErrors,
  createProduct
);
router.put(
  '/:id',
  productUpload,
  handleUploadErrors,
  updateProduct
);
router.delete('/:id', deleteProduct);

export default router;
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import { existsSync } from 'fs';

// Get current directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure upload directory
const uploadDir = path.join(__dirname, '../../uploads');

// Ensure upload directory exists
const ensureUploadsDir = async () => {
  try {
    if (!existsSync(uploadDir)) {
      await fs.mkdir(uploadDir, { recursive: true });
      console.log(`Created upload directory at: ${uploadDir}`);
    }
  } catch (err) {
    console.error('Failed to create upload directory:', err);
    throw err;
  }
};

// File filter configuration
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, PNG and WebP files are allowed'), false);
  }
};

// Storage configuration
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    await ensureUploadsDir();
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `product-${uniqueSuffix}${ext}`);
  }
});

// Initialize multer
const productUpload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 11 // 1 thumbnail + 10 images
  }
}).fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'images', maxCount: 10 }
]);

// Error handling middleware
const handleUploadErrors = (err, req, res, next) => {
  if (err) {
    console.error('Upload error:', err);
    return res.status(400).json({
      success: false,
      message: err.message,
      code: err.code || 'UPLOAD_ERROR'
    });
  }
  next();
};

export { productUpload, handleUploadErrors };
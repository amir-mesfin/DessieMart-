import Product from '../models/Product.js';
import { unlink } from 'fs/promises';
import { validateImageUrl } from '../utils/imageUtils.js';

export const createProduct = async (req, res) => {
  try {
    const { title, description, category, brand, price, discountPercentage, stock, thumbnailUrl, imagesUrls } = req.body;

    // Validate required fields
    if (!title || !description || !category || !brand || !price) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Validate at least one thumbnail source
    if (!req.files?.thumbnail?.[0] && !thumbnailUrl) {
      return res.status(400).json({ message: 'Either thumbnail file or URL is required' });
    }

    // Process thumbnail
    let thumbnail;
    if (req.files?.thumbnail?.[0]) {
      thumbnail = req.files.thumbnail[0].path;
    } else {
      try {
        await validateImageUrl(thumbnailUrl);
        thumbnail = thumbnailUrl;
      } catch (err) {
        return res.status(400).json({ message: 'Invalid thumbnail URL' });
      }
    }

    // Process additional images
    let images = [];
    if (req.files?.images) {
      images = req.files.images.map(f => f.path);
    }
    
    if (imagesUrls) {
      try {
        const urls = imagesUrls.split(',').map(url => url.trim());
        for (const url of urls) {
          await validateImageUrl(url);
        }
        images = [...images, ...urls];
      } catch (err) {
        // Clean up uploaded files if URL validation fails
        if (req.files?.images) {
          await Promise.all(req.files.images.map(file => 
            unlink(file.path).catch(() => {})
          ));
        }
        return res.status(400).json({ message: 'One or more image URLs are invalid' });
      }
    }

    // Create product
    const product = new Product({
      title,
      description,
      category,
      brand,
      price: parseFloat(price),
      discountPercentage: discountPercentage ? parseFloat(discountPercentage) : 0,
      stock: stock ? parseInt(stock) : 0,
      thumbnail,
      images
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error('Error creating product:', err);
    
    // Clean up uploaded files if error occurs
    if (req.files) {
      await Promise.all([
        req.files.thumbnail?.[0] && unlink(req.files.thumbnail[0].path).catch(() => {}),
        ...(req.files.images || []).map(file => unlink(file.path).catch(() => {}))
      ]);
    }

    res.status(500).json({ 
      message: err.message || 'Failed to create product',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
  }
};


// Get all products
export const getProducts = async (req, res) => {
  try {
    const { search } = req.query;
    const query = search
      ? { title: { $regex: search, $options: 'i' } }
      : {};
    const products = await Product.find(query).populate('category');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, brand, price, discountPercentage, stock, thumbnailUrl, imagesUrls } = req.body;

    const existing = await Product.findById(id);
    if (!existing) return res.status(404).json({ message: 'Not found' });

    if (req.files?.thumbnail?.[0]) {
      existing.thumbnail = req.files.thumbnail[0].path;
    } else if (thumbnailUrl) {
      existing.thumbnail = thumbnailUrl;
    }

    let newImages = req.files?.images?.map(f => f.path) || [];
    if (imagesUrls) {
      const urls = typeof imagesUrls === 'string' ? JSON.parse(imagesUrls) : imagesUrls;
      newImages = newImages.concat(urls);
    }
    if (newImages.length) existing.images = newImages;

    existing.title = title || existing.title;
    existing.description = description || existing.description;
    existing.category = category || existing.category;
    existing.brand = brand || existing.brand;
    existing.price = price || existing.price;
    existing.discountPercentage = discountPercentage ?? existing.discountPercentage;
    existing.stock = stock ?? existing.stock;

    const updated = await existing.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
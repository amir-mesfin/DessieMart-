import axios from 'axios';
import { fileTypeFromBuffer } from 'file-type';

export const validateImageUrl = async (url) => {
  try {
    // Basic URL validation
    if (!/^https?:\/\/.+/i.test(url)) {
      throw new Error('Invalid URL format');
    }

    // Fetch image headers to verify content type
    const response = await axios.head(url);
    const contentType = response.headers['content-type'];
    if (!contentType || !contentType.match(/^image\/(jpeg|png|webp)/i)) {
      throw new Error('URL does not point to a valid image (JPEG, PNG, WebP)');
    }

    // Optional: Download a small portion to verify file type
    const { data } = await axios.get(url, { 
      responseType: 'arraybuffer',
      maxContentLength: 1024 * 1024, // 1MB max
      timeout: 5000
    });

    const fileType = await fileTypeFromBuffer(data);
    if (!fileType || !fileType.mime.match(/^image\/(jpeg|png|webp)/i)) {
      throw new Error('File content does not match image type');
    }

    return true;
  } catch (err) {
    console.error(`Image URL validation failed for ${url}:`, err);
    throw new Error(`Invalid image URL: ${err.message}`);
  }
};

import 'dotenv/config'
import express from 'express'
import cors from 'cors';
import connectDB from './config/db.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import paymentRoutes from  './routes/paymentRoutes.js'
// Initialize
 const app = express();

// Database connection
connectDB().then(() => {
  // Middleware
  app.use(cors({ origin: true }));
  app.use(express.json());

  // Routes
  app.use('/api', categoryRoutes);
  app.use('/api', productRoutes);
   app.use('/api',  paymentRoutes);

  // Start server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });

});

// import dotenv from "dotenv";
// dotenv.config();

// import express from 'express';
// import cors from "cors";
// import Stripe from "stripe";

// // now use the env variable (it's loaded)
// const stripe = new Stripe(process.env.STRIPE_KEY);

// const app = express();
// app.use(cors({ origin: true }));
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.status(200).json({ message: "success" });
// });

// app.post("/payment/create", async (req, res) => {
//   const total = parseInt(req.query.total);
//   console.log(total);

//   if (total > 0) {
//     console.log("payment received ", total);
    
//     try {
//       const paymentIntent = await stripe.paymentIntents.create({
//         amount: total, // subunits of currency
//         currency: "usd",
//       });
      
//       res.status(201).json({
//         clientSecret: paymentIntent.client_secret,
//       });
//     } catch (error) {
//       console.error("Error creating payment intent:", error);
//       res.status(500).json({ error: "Failed to create payment intent" });
//     }
//   } else {
//     res.status(400).json({ error: "Amount must be greater than 0" });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, (err) => {
//    if (err) throw err;
//   console.log(`🚀 Server is running on http://localhost:${PORT}`);
// });

// backend/node-express/server.js
// backend/server.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
// import api from

// Initialize
const app = express();

// Database connection
connectDB().then(() => {
  // Middleware
  app.use(cors());
  app.use(express.json());

  // Routes
  app.use('/api', categoryRoutes);
  app.use('/api', productRoutes);
  // Start server
  const PORT = process.env.PORT || 5175;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
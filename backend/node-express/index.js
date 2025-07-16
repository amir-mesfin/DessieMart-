const dotenv = require("dotenv");
dotenv.config(); 


const express = require('express');
const cors = require("cors");

// now use the env variable (it's loaded)
const stripe = require("stripe")(process.env.STRIPE_KEY);


const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "success" });
});

app.post("/payment/create", async (req, res) => {
  const total = parseInt(req.query.total);
  console.log(total);
  console.log("Stripe key loaded:", process.env.STRIPE_KEY);

  if (total > 0) {
    console.log("payment received ", total);
    
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total, // subunits of currency
        currency: "usd",
      });
      
      res.status(201).json({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      logger.error("Error creating payment intent:", error);
      res.status(500).json({ error: "Failed to create payment intent" });
    }
  } else {
    res.status(400).json({ error: "Amount must be greater than 0" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
   if(err) throw err
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
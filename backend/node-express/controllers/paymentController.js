import dotenv from "dotenv";
dotenv.config();

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_KEY);


// send success message 

export const PaymentSuccess = async(req,res)=>{
  res.status(200).json({ message: "success" });
}


export const PaymentCreate = async(req,res)=>{
      const total = parseInt(req.query.total);
      console.log(total);

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
              console.error("Error creating payment intent:", error);
              res.status(500).json({ error: "Failed to create payment intent" });
               }
      } else {
        res.status(400).json({ error: "Amount must be greater than 0" });
      }
}
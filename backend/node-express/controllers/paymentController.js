import dotenv from "dotenv";
dotenv.config();

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_KEY);


// send success message 

export const PaymentSuccess = async(req,res)=>{
  res.status(200).json({ message: "success" });
}


export const PaymentCreate = async(req,res)=>{
      const amountInDollars = parseInt(req.body.total);
      
      console.log(amountInDollars);

      if (amountInDollars > 0) {
        console.log("payment received ", amountInDollars);
        const amountInCents = Math.round(amountInDollars * 100);
        
        
            try {
              const paymentIntent = await stripe.paymentIntents.create({
                amount: amountInCents, // subunits of currency
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
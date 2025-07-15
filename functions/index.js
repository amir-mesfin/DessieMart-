const dotenv = require("dotenv");
dotenv.config(); 

const { setGlobalOptions } = require("firebase-functions");
const { onRequest } = require("firebase-functions/https");
const logger = require("firebase-functions/logger");

const express = require('express');
const cors = require("cors");
const { CgLaptop } = require("react-icons/cg");

// now use the env variable (it’s loaded)
const stripe = require("stripe")(process.env.STRIPE_KEY);

setGlobalOptions({ maxInstances: 10 });

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "success" });
});

app.post("/payment/create",async(req,res)=>{
   const total = req.query.total;
   if(total>0){
     console.log("payment recieved "+ total )
   }
})
exports.api = onRequest(app);

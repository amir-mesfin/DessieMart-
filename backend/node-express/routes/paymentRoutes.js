import express from 'express'
import {
  PaymentCreate,
  PaymentSuccess
} from '../controllers/paymentController.js'

const router = express.Router();

// payment Router  

router.get('/payment',PaymentSuccess);
router.post('/payment/create',PaymentCreate);


export  default router ;
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/landing/Landing'
import Auth from './pages/auth/Auth'
import Payment from './pages/Payment/Payment'
import Order from './pages/Orders/Order'
import Cart from './pages/Cart/Cart'
import Product from './pages/product/Product'
import ProductDescription  from './pages/productDescription/ProductDescription'
import InformationPage from './pages/information/InformationPage'
import {CheckoutProvider} from '@stripe/react-stripe-js'
import {loadStripe } from '@stripe/stripe-js'
export default function Routing() {
   const stripePromise = loadStripe('pk_test_51RklOiFhGzFLhj6jK5p50XPBIQKhbmwuSuM2jK1y4kRHqHgOZPtfqostytVkE7GWeDB0FEHDshq9Qp6kbRdeg4Cc00bMSPxnCr');
  return (
   <Router>
      <Routes>
         <Route path="/" element ={<Landing />} />
         <Route path="/auth" element ={<Auth />} />
         <CheckoutProvider stripe={stripePromise} options={{fetchClientSecret}}>
         <Route path="/payment" element ={<Payment />} />
          </CheckoutProvider>
         <Route path="/order" element ={<Order />} />
         <Route path="/cart" element ={<Cart />} />
         <Route path="/product/:categoryName" element={<Product />} />
         <Route path="/productDescriptions/:productId" element={ <ProductDescription />} />
         <Route path="/information" element={<InformationPage />} />
      </Routes>
   </Router>
  )
}

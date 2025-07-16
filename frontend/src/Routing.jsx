import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/landing/Landing'
import Auth from './pages/auth/Auth'
import Payment from './pages/Payment/Payment'
import Order from './pages/Orders/Order'
import Cart from './pages/Cart/Cart'
import Product from './pages/product/Product'
import ProductDescription  from './pages/productDescription/ProductDescription'
export default function Routing() {
  return (
   <Router>
      <Routes>
         <Route path="/" element ={<Landing />} />
         <Route path="/auth" element ={<Auth />} />
         <Route path="/payment" element ={<Payment />} />
         <Route path="/order" element ={<Order />} />
         <Route path="/cart" element ={<Cart />} />
         <Route path="/product/:categoryName" element={<Product />} />
         <Route path="/productDescriptions/:productId" element={ <ProductDescription />} />
      </Routes>
   </Router>
  )
}

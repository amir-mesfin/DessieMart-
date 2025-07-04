import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/landing/Landing'
import Signup from './pages/Auth/Signup'
import Payment from './pages/Payment/Payment'
import Order from './pages/Orders/Order'
import Cart from './pages/Cart/Cart'
import Product from './component/product/Product'
import ProductDescription  from './pages/productDescription/ProductDescription'
export default function Routering() {
  return (
   <Router>
      <Routes>
         <Route path="/" element ={<Landing />} />
         <Route path="/auth" element ={<Signup />} />
         <Route path="/payment" element ={<Payment />} />
         <Route path="/order" element ={<Order />} />
         <Route path="/cart" element ={<Cart />} />
         <Route path="/product/:categoryName" element={<Product />} />
         <Route path="/productDescriptions/:id" element={ <ProductDescription />} />
      </Routes>
   </Router>
  )
}

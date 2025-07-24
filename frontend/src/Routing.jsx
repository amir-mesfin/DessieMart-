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
import CategoryPage from './pages/CategoryPage/CategoryPage'
import ProductAddPage from './pages/productAdd/ProductAddPage'
import ProtectedRoute from './pages/dashboard/components/routeProtect/ProtectedRoute'
import AdminDashboard from './pages/dashboard/AdminDashboard'
import SellerDashboard from './pages/dashboard/SellerDashboard'
import {Elements} from '@stripe/react-stripe-js';
import ProtectedRouteP from './component/protectedRoute/ProtectedRouteP'
import {loadStripe} from '@stripe/stripe-js'
import AllProduct from './pages/allProduct/AllProduct'
export default function Routing() {
   const stripePromise = loadStripe('pk_test_51RklOiFhGzFLhj6jK5p50XPBIQKhbmwuSuM2jK1y4kRHqHgOZPtfqostytVkE7GWeDB0FEHDshq9Qp6kbRdeg4Cc00bMSPxnCr');
  return (
   <Router>
      <Routes>
         <Route path="/" element ={<Landing />} />
         <Route path="/auth" element ={<Auth />} />

          {/* secure the payment method */}
          <Route 
                  path="/payment"
                  element={
                     <ProtectedRouteP msg="you must login to pay"  redirect="/payment">
                              <Elements stripe={stripePromise}>
                                       <Payment />
                              </Elements>
                     </ProtectedRouteP>
                  }
         />
          <Route 
                  path="/order"
                  element={
                     <ProtectedRouteP msg="you must login to access  Your orders" redirect="/order">
                              <Elements stripe={stripePromise}>
                                       <Order />
                              </Elements>
                     </ProtectedRouteP>
                  }
         />


          
         <Route path="/cart" element ={<Cart />} />
         <Route path="/product/:categoryName" element={<Product />} />
         <Route path="/productDescriptions/:productId" element={ <ProductDescription />} />
         <Route path="/information" element={<InformationPage />} />
         <Route path="/category"  element={<CategoryPage />} />
         <Route path="/productAddPage"  element={<ProductAddPage />} />
         <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
            path="/seller"
            element={
               <ProtectedRoute allowedRoles={['seller']}>
               <SellerDashboard />
               </ProtectedRoute>
            }
         />
         <Route 
              path="/all_product"
              element={ <AllProduct />}  />

        <Route  path="/information"
                element={
                   <InformationPage />
                }   />
      </Routes>  

   </Router>
  )
}

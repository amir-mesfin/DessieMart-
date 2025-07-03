import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './component/header/Header'
import LowerHeader from './component/header/LowerHeader'
import Carousels from './component/carousel/Carousels'
import Catagory from './component/catagory/Catagory'
import Product from './component/product/Product'
import ProductDescription from './component/productDescription/ProductDescription'
export default function App() {
  return (
    <Router>
      <Header />
      <LowerHeader />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Carousels />
              <Catagory />
            </>
          }
        />
        <Route path="/product/:categoryName" element={<Product />} />
        <Route path="/productDescriptions/:id" element={ <ProductDescription />} />
      </Routes>
    </Router>
  )
}

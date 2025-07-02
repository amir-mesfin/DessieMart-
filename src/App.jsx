import React from 'react'
import Header from './component/header/Header'
import LowerHeader from './component/header/LowerHeader'
import Carousels  from './component/carousel/Carousels'
import Catagory from './component/catagory/Catagory'
export default function App() {
  return (
    <div>
      <Header />
      <LowerHeader/>
      <Carousels  />
      <Catagory />
    </div>
  )
}

import React from 'react'
import LowerHeader from '../../component/header/LowerHeader'
import Header from '../../component/header/Header'
export default function  ({children}) {
  return (
    <div>
       <Header />
       <LowerHeader />
       {children}
    </div>
  )
}

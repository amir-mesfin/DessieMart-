import React from 'react'
import LayOut from '../layOut/LayOut'
import Carousels from '../../component/carousel/Carousels'
import Catagory from '../../component/catagory/Catagory'
export default function Landing() {
  return (
   <LayOut>
       <Carousels />
       <Catagory />
   </LayOut>
  )
}

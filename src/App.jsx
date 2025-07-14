import React, { useContext, useEffect } from 'react'
import Routing from './Routing'
import { DataContext } from './component/dataProvider/DataProvider'
import {auth} from './utility/firebase'
import { Type } from './utility/action.type'
export default function App() {
  const [state,dispatch]=useContext(DataContext)
  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
        if(authUser){
               dispatch({
                type:Type.SET_USER,
                 user : authUser
               });
        }else{
          dispatch({
            type:Type.SET_USER,
            user : null
           });
        }
    })
  },[])
  return   <Routing />
}

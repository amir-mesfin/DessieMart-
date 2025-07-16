import React, {createContext, useReducer} from 'react'


export const DataContext =  createContext();

export const  DataProvider =({children,reducer,initialSate})=>{
  return (
    <DataContext.Provider value={useReducer(reducer,initialSate)} >
      {children}
    </DataContext.Provider>
  )
}

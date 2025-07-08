import { useReducer } from 'react'
import {Type} from './action.type'

export const initialSate = {
  basket:[]
}

export const reducer = (state, action) => {
  switch(action.type) {
    case Type.ADD_TO_BASKET:
      // Check if the item exists
      const existingItem = state.basket.find((item) => item.id === action.item.id);
      
      if(!existingItem) {
        return {
          ...state,
          basket: [...state.basket, {...action.item, amount: 1}]
        };
      } else {
        const updatedBasket = state.basket.map((item) => 
          item.id === action.item.id ? {...item, amount: item.amount + 1} : item
        );
        
        return {
          ...state,
          basket: updatedBasket
        };
      }
      case Type.INCREMENT_ITEM:
        return {
          ...state,
          basket: state.basket.map(item =>
            item.id === action.item.id ? {...item, amount: item.amount + 1} : item
          )
        };
      
      case Type.DECREMENT_ITEM:
        return {
          ...state,
          basket: state.basket.map(item =>
            item.id === action.item.id ? {...item, amount: Math.max(1, item.amount - 1)} : item
          )
        };
      
    default:
      return state;
  }
}
// const [state, dispatch] = useReducer(reducer,initialState,init)
import { useReducer } from 'react'
import {Type} from './action.type'

export const initialSate = {
  basket:[],
  user:null,
  fast_buy:[]
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
          const index = state.basket.findIndex(item => item.id === action.item.id);
          let newBasket = [...state.basket];
          
          if(index >= 0) {
              if(newBasket[index].amount > 1) {
                  newBasket[index] = {
                      ...newBasket[index],
                      amount: newBasket[index].amount - 1
                  };
              } else {
                  newBasket.splice(index, 1);
              }
          }
          
          return {
              ...state,
              basket: newBasket
          };
    case Type.SET_USER :
      return{
         ...state,
         user:action.user
      }
    case Type.EMPTY_BASKET:
      return{
         ...state,
         basket:[],
      }
    case Type.FAST_BUY :
       return{
         ...state,
         fast_buy:[action.item]

       }
      
    default:
      return state;
  }
}
// const [state, dispatch] = useReducer(reducer,initialState,init)
// totalPrice.js
import { useContext } from 'react';
import { DataContext } from '../dataProvider/DataProvider';

export default function UseTotalPrice() {
  const [{ basket }] = useContext(DataContext);

  const totalPrice = basket.reduce((sum, item) => 
    sum + (item.price * item.amount), 0);

  return totalPrice;
}


import React, { useState } from "react";
import Button from "../Button/button";
import './itemCount.css'
import { useContext } from 'react';
import CartContext from "../Context/CartContext";

const ItemCount = ({initial, stock, onAddToCart}) => {
  const [count, setCount] = useState(initial);
  
  const decrease = () => {
    if(count > initial) {
      setCount(count - 1);
    }
  };

  const increase = () => {
    if(count < stock) {
      setCount(count + 1);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(count); 
    setCount(initial); 
  }

  return (
    <div className="itemCount">
      <Button onClick={decrease}>-</Button> 
      <span className='contador'>{count}</span>
      <Button onClick={increase}>+</Button> 
      <Button className="btn-comprar" onClick={handleAddToCart}>Comprar</Button>
    </div>
  );
}

export default ItemCount;




 
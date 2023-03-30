import React, { useState, useEffect } from 'react';
import ItemCount from '../ItemCount/ItemCount';
import cartContext from "../Context/CartContext";
import { useContext } from 'react';
import {  collection, doc, getDoc } from "firebase/firestore";
import Swal from 'sweetalert2';

const ItemDetail = ({ idProd, db }) => {
  const [prod, setProd] = useState({});
  const { cart, addItem } = useContext(cartContext);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const productosColRef = collection(db, "productos");
        const docRef = doc(productosColRef, idProd);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          setProd(docSnapshot.data());
        } else {
          console.log("!");
        }
      } catch (error) {
        console.log("", error);
      }
    }

    fetchProduct();
  }, [idProd, db]);

  console.log(prod)

  const onAddToCart = (quantity) => {
    Swal.fire({
      title: 'Producto Agregado!',
      text: `Agregaste ${quantity} productos al carrito`,
      icon: 'success',
      customClass: 'swal-custom-background',
    
    });
    addItem({...prod, id: idProd}, quantity);
  }
  
  return (
    <div className="card card-detalle">
      <div className='imgProd'>
        <img src={prod.img} alt={prod.title} />
      </div> 
      <div className="title">
        <h4 className="nombre-detalle">{prod.title}</h4>
      </div>
      <div className="containerDescription">
        <p className="precioDetalle">${prod.price}</p>
        <ItemCount onAddToCart={onAddToCart} initial={1} stock={prod.stock} />
      </div>
    </div>
  )
}

export default ItemDetail;
                              
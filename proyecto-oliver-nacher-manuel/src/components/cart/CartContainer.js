import React, { useContext, useState, useEffect } from 'react';
import cartContext from '../Context/CartContext';
import './cartContainer.css';
import Button from '../Button/button';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';


function CartContainer() {
  const { cart, clearCart, removeProduct } = useContext(cartContext);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      const item = cart[i];
      if (item && item.price && !isNaN(parseFloat(item.price))) {
        total += parseFloat(item.price) * item.quantity;
      }
    }
    setTotalPrice(total);
  }, [cart]);

  return (
    <div>
      {cart.length > 0 ? (
        <h4 className="text-center text-white">Productos en Carrito</h4>
      ) : (
        <h4 className="text-center text-white">No hay productos</h4>
      )}
      {cart.map((produ, index) => {
        return (
          <div key={index} className="cartContent">
            <img src={produ.img} alt="product in cart" />
            <h5 className="name text-white">{produ.title}</h5>
            <h5 className="count text-white">Cantidad: {produ.quantity}</h5>
            <h5 className="price text-white">
              ${parseFloat(produ.price) * produ.quantity}
            </h5>
            <button
              className="delete-button"
              onClick={() => removeProduct(produ.id)}
            >
              <FaTrash className="trash-icon" />
            </button>
          </div>
        );
      })}
      {cart.length > 0 && (
        <>
          <div className="d-flex justify-content-end mt-3">
            <button
              type="button"
              className="btn btn-danger mx-5"
              onClick={clearCart}
            >
            
              Vaciar Carrito
            </button>
          </div>

          <div className="mt-3">
            <h4 className="text-center text-white">
              Total a Pagar: ${totalPrice.toFixed()}
            </h4>

            <div className="d-flex justify-content-center mt-4">
  <Link to="/checkout" className="btn-buy" onClick={() => {
    Swal.fire({
      title: "Estas seguro de confirmar la compra?",
      text: "La compra se realizara!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si,Confirmar!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Confirmada!",
          "La compra se realizó con exito.",
          "success"
        );
        window.location.reload();
      }
    });
  }}>
    Terminar compra
  </Link>
</div>

          </div>
        </>
      )}
    </div>
  );
}

export default CartContainer;








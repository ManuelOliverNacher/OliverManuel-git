import { useContext } from "react";
import CartContext from "../Context/CartContext";

const CartContainer = () => {
  const { cart, removeProduct } = useContext(CartContext);
  

  return (
    <div>
     {cart.map((product) => (
      <div key={product.id}>
        <img src={product.img} alt={product.title} />
        <p>Nombre: {product.title}</p>
        <p>Cantidad: {product.quantity}</p>
        <p>Precio: {product.price}</p>
        <button onClick={() => removeProduct(product.id)}>Remove</button>
      </div>
     ))}
    </div>
  );
};

export default CartContainer;






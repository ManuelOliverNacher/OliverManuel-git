import { useContext, useState } from "react";
import {CartContext} from "../Context"
import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";

function CheckoutCart() {
  const [buyerInfo, setBuyerInfo] = useState({});
  const { cart, total } = useContext(CartContext);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const order = { buyer: buyerInfo, items: cart, total: total };
    const ordersCollection = collection(db, "orders");
    addDoc(ordersCollection, order)
      .then((docRef) => {
        console.log("Orden:", docRef.id);
      })
      .catch((error) => {
        console.error("Error : ", error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBuyerInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        Nombre:
        <input type="text" name="nonmbre:" onChange={handleInputChange} />
      </label>
      <label>
        Email:
        <input type="email" name="email" onChange={handleInputChange} />
      </label>
      <label>
        Telefono:
        <input type="number" name="Numero" onChange={handleInputChange} />
      </label>
      <button type="submit">Enviar</button>
    </form>
  );
}

export default CheckoutCart;

import { useContext, useState } from "react";
import cartContext from "../Context/CartContext";
import { addDoc, collection } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import "./ItemDetail.css" 
import { initializeApp } from "firebase/app";

//Configuracion de firebase-----------------------------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyC0lEeptOp6_WbNxb9421ewV1oypwlNbPU",
  authDomain: "olivernachermanuel-proyecto.firebaseapp.com",
  projectId: "olivernachermanuel-proyecto",
  storageBucket: "olivernachermanuel-proyecto.appspot.com",
  messagingSenderId: "721612872490",
  appId: "1:721612872490:web:de05500ee31ae065e21c53",
  measurementId: "G-CTY1J091SS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//Configuracion de firebase------------------------------------------------------

function CheckoutCart() {
  const [buyerInfo, setBuyerInfo] = useState({});
  const { cart, total } = useContext(cartContext);

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
    <div className="container">
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <h3 className="text-center mb-4">Orden de Compra</h3>
        <form className="Form" onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input type="text" className="form-control" id="nombre" name="nombre" onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" className="form-control" id="email" name="email" onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="telefono">Teléfono:</label>
            <input type="text" className="form-control" id="telefono" name="telefono" onChange={handleInputChange} />
          </div>
          <button className="btn btn-primary btn-block mt-4" type="submit">Enviar</button>
        </form>
      </div>
    </div>
  </div>
  );
}

export default CheckoutCart;

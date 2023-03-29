import { createContext, useState } from "react";

const cartContext = createContext({
  cart: [],
  addItem: () => {},
  clearCart: () => {},
  removeProduct: () => {},
  getCount: () => {},
  getTotal: () => {},
  
});

function CartContextProvider(props) {
  const [cart, setCart] = useState([]);

  const isInCart = (id) =>
    cart.find((product) => product.id === id) ? true : false;

  const removeProduct = (id) =>
    setCart(cart.filter((product) => product.id !== id));

    const getCount = () => {
      let count = 0;
      cart.forEach((product) => {
        count += product.quantity;
      });
      return count;
    };
    
    
    const getTotal = () => {
      let total = 0;
      cart.forEach((e) => (total += e.quantity * e.price));
      return total;
    };

    const addItem = (item) => {
      const existingItemIndex = cart.findIndex((product) => product.id === item.id);
      if (existingItemIndex > -1) {
        const updatedCart = [...cart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + 1
        };
        setCart(updatedCart);
      } else {
        const newItem = {
          ...item,
          id: new Date().getTime(),
          img: item.img,
          title: item.title,
          price: item.price
        }
        setCart([...cart, newItem]);
      }
    };
    
  const clearCart = () => {
    setCart([]);
  };

  return (
    <cartContext.Provider
      value={{
        cart,
        addItem,
        clearCart,
        removeProduct,
        getCount,
        getTotal,
      }}
    >
      {props.children}
    </cartContext.Provider>
  );
}



export { CartContextProvider };
export default cartContext;

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
    function calculateTotalPrice(cart) {
      let totalPrice = 0;
      for (let i = 0; i < cart.length; i++) {
        const item = cart[i];
        if (item && item.price && !isNaN(parseFloat(item.price))) {
          totalPrice += parseFloat(item.price) * item.quantity;
        }
      }
      return totalPrice;
    }
    
    
    const getTotal = () => {
      let total = 0;
      cart.forEach((e) => (total += e.quantity * e.price));
      return total;
    };
    const addItem = (item, quantity) => {
      const existingItemIndex = cart.find((product) => product.id === item.id);
      if (existingItemIndex) {
        const carritoActualizado = cart.map((prod) => {
          if (prod.id === item.id) {
            return { ...prod, quantity: prod.quantity + quantity }
          } else {
            return prod
          }
        })
        setCart(carritoActualizado)
      } else {
        const newItem = {
          ...item,
          quantity
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

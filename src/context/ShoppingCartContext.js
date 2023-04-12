import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { ShoppingCart } from "../components/Cart/ShoppingCart";

const ShoppingCartContext = createContext({});

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const openCart = () => setIsOpen(true);

  const closeCart = () => setIsOpen(false);

  function getItemQuantity(id) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseCartQuantity(id) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function decreaseCartQuantity(id) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(id) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }

  function removeCart() {
    setCartItems((currItems) => {
      return currItems.filter((item) => (item.id = 0));
    });
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
        removeCart,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen}></ShoppingCart>
    </ShoppingCartContext.Provider>
  );
}

ShoppingCartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

useShoppingCart.propTypes = {
  getItemQuantity: PropTypes.func.isRequired,
  increaseCartQuantity: PropTypes.func.isRequired,
  decreaseCartQuantity: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  openCart: PropTypes.func.isRequired,
  closeCart: PropTypes.func.isRequired,
  cartItems: PropTypes.array.isRequired,
  cartQuantity: PropTypes.number.isRequired,
  removeCart: PropTypes.func.isRequired,
};

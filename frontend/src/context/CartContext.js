import React, { createContext, useReducer } from 'react';
import cartReducer from './cartReducer';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const initialState = {
    items: [],
  };

  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ cart: state, cartDispatch: dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
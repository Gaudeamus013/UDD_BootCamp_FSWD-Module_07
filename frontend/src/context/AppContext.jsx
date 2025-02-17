import React, { createContext, useReducer, useEffect } from 'react';
import appReducer from './appReducer';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  cart: []
};

export const AppContext = createContext(initialState);

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Guardar usuario en localStorage
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

const cartReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_TO_CART': {
        const existingProductIndex = state.items.findIndex(item => item.id === action.payload.id);
        if (existingProductIndex !== -1) {
          // Producto ya existe, incrementar la cantidad
          const updatedItems = state.items.map((item, index) =>
            index === existingProductIndex
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          );
          return {
            ...state,
            items: updatedItems,
          };
        } else {
          // Producto no existe, agregar al carrito
          return {
            ...state,
            items: [...state.items, action.payload],
          };
        }
      }
      case 'UPDATE_CART_ITEM': {
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
        );
        return {
          ...state,
          items: updatedItems,
        };
      }
      case 'REMOVE_FROM_CART': {
        const updatedItems = state.items.filter(item => item.id !== action.payload.id);
        return {
          ...state,
          items: updatedItems,
        };
      }
      case 'CLEAR_CART': {
        return {
          ...state,
          items: [],
        };
      }
      default:
        return state;
    }
  };
  
  export default cartReducer;
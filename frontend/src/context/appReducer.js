const appReducer = (state, action) => {
    switch (action.type) {
      case 'LOGIN':
        return { ...state, user: action.payload };
      case 'LOGOUT':
        return { ...state, user: null, cart: [] };
      case 'ADD_TO_CART':
        // Si el producto ya existe, incrementar cantidad
        const existItem = state.cart.find(item => item._id === action.payload._id);
        if (existItem) {
          return {
            ...state,
            cart: state.cart.map(item =>
              item._id === action.payload._id ? { ...item, quantity: item.quantity + 1 } : item
            )
          };
        } else {
          return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] };
        }
      case 'REMOVE_FROM_CART':
        return { ...state, cart: state.cart.filter(item => item._id !== action.payload) };
      case 'CLEAR_CART':
        return { ...state, cart: [] };
      default:
        return state;
    }
  };
  
  export default appReducer;
  
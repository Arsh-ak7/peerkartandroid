import constants from '../constants';

const initialState = {
  name: '',
  category: '',
  items: [],
  address: {},
  payment: {},
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.ADD_TO_CART:
      const item = {
        name: action.payload.itemName,
        qty: action.payload.qty,
        unit: action.payload.unit,
      };
      const existingItem = state.items.find(
        item => item.itemName === action.payload.itemName,
      );

      if (existingItem !== undefined) {
        const newList = state.items.map(item =>
          item.name === action.payload.itemName
            ? (item.qty = action.payload.itemQty)
            : item,
        );
        return {
          ...state,
          items: newList,
        };
      } else {
        return {
          ...state,
          items: [...state.items, item],
        };
      }
    case constants.REMOVE_FROM_CART:
      const remItems = state.cart.filter(
        item => action.payload.itemName !== item.name,
      );
      return {
        ...state,
        cart: remItems,
      };
    case constants.ADD_ORDER_NAME:
      return {
        ...state,
        name: action.payload,
      };
    case constants.ADD_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    case constants.RESET_CART:
      return {
        ...state,
        name: '',
        category: '',
        items: [],
        address: {},
        payment: {},
      };
    default:
      return state;
  }
};

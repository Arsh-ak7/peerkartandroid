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
        category: action.payload.category,
        itemName: action.payload.itemName,
        itemQty: action.payload.itemQty,
      };

      const existingItem = state.items.find(
        item => item.itemName === action.payload.itemName,
      );

      if (existingItem) {
        const newList = state.items.map(item =>
          item.itemName === action.payload.itemName
            ? (item.itemQty = action.payload.itemQty)
            : item,
        );
        return {
          ...state,
          items: newList,
        };
      } else {
        return {
          ...state,
          cart: [...state.items, item],
        };
      }
    case constants.REMOVE_FROM_CART:
      const remItems = state.cart.filter(
        item => action.payload.itemName !== item.itemName,
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
    default:
      return state;
  }
};

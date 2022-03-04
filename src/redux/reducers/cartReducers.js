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
        itemName: action.payload.itemName,
        itemQty: action.payload.qty,
        itemUnit: action.payload.unit,
      };
      console.log(action.payload);
      const existingItem = state.items.find(
        item => item.itemName === action.payload.itemName,
      );

      if (existingItem !== undefined) {
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
          items: [...state.items, item],
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
    case constants.ADD_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    default:
      return state;
  }
};

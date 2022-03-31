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
        name: action.payload.name,
        quantity: action.payload.qty,
        unit: action.payload.unit,
      };
      const existingItem = state.items.find(
        item => item.name === action.payload.name,
      );
      if (existingItem !== undefined) {
        return {
          ...state,
          items: state.items.map(item =>
            item.name === action.payload.name
              ? {
                  ...item,
                  quantity: action.payload.qty,
                  unit: action.payload.unit,
                }
              : item,
          ),
        };
      } else {
        return {
          ...state,
          items: [...state.items, item],
        };
      }
    case constants.REMOVE_FROM_CART:
      const remItems = state.items.filter(
        item => action.payload.name !== item.name,
      );
      return {
        ...state,
        items: remItems,
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

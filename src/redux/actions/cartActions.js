import constants from '../constants';
import { useDispatch } from 'react-redux';

export const addToCart = (itemName, itemQty, category) => {
  const dispatch = useDispatch();
  dispatch({
    type: constants.ADD_TO_CART,
    payload: {
      category,
      itemName,
      itemQty,
    },
  });
};

export const removeFromCart = itemName => {
  const dispatch = useDispatch();
  dispatch({
    type: constants.REMOVE_FROM_CART,
    payload: {
      itemName,
    },
  });
};

export const adjustItemQty = (itemName, itemQty, category) => {
  const dispatch = useDispatch();
  dispatch({
    type: constants.ADJUST_ITEM_QTY,
    payload: {
      itemName,
      itemQty,
      category,
    },
  });
};

export const loadCurrentItem = item => {
  const dispatch = useDispatch();
  dispatch({
    type: constants.LOAD_CURRENT_ITEM,
    payload: item,
  });
};

export const addOrderName = orderName => {
  const dispatch = useDispatch();
  dispatch({
    type: constants.ADD_ORDER_NAME,
    payload: orderName,
  });
};

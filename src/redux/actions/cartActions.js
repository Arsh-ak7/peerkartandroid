import constants from '../constants';

export const addToCart = (dispatch, item) => {
  dispatch({
    type: constants.ADD_TO_CART,
    payload: item,
  });
};

export const removeFromCart = (dispatch, item) => {
  dispatch({
    type: constants.REMOVE_FROM_CART,
    payload: item,
  });
};

export const adjustItemQty = (dispatch, item) => {
  dispatch({
    type: constants.ADJUST_ITEM_QTY,
    payload: item,
  });
};

export const loadCurrentItem = (dispatch, item) => {
  dispatch({
    type: constants.LOAD_CURRENT_ITEM,
    payload: item,
  });
};

export const addOrderName = (dispatch, orderName) => {
  dispatch({
    type: constants.ADD_ORDER_NAME,
    payload: orderName,
  });
};

export const addCategory = (dispatch, category) => {
  dispatch({
    type: constants.ADD_CATEGORY,
    payload: category,
  });
};

export const resetCart = dispatch => {
  dispatch({
    type: constants.RESET_CART,
  });
};

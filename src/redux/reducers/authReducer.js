import constants from '../constants';

let initialState = {
  userData: {},
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.LOGIN_SUCCESS:
      return {
        ...state,
        userData: action.payload,
        error: {},
      };
    case constants.LOGIN_FAIL:
      return {
        ...state,
        userData: {},
        error: action.payload,
      };
    case constants.REGISTER_SUCCESS:
      return {
        ...state,
        userData: action.payload,
        error: {},
      };
    case constants.REGISTER_FAIL:
      return {
        ...state,
        userData: {},
        error: action.payload,
      };
    case constants.LOGOUT:
      return {
        ...state,
        userData: {},
      };
    default:
      return state;
  }
};

import constants from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  userData: {},
  error: {},
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.LOGIN_SUCCESS:
      //  AsyncStorage.setItem('jwtToken', data.payload.token);

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
      //  AsyncStorage.setItem('jwtToken', data.payload.token);

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
        state: initialState,
      };
    default:
      return { ...state };
  }
};
